import fs from 'node:fs';
import path from 'node:path';
import type { Nodes, Root } from 'mdast';
import { FRAMEWORKS, type Framework } from './define';
import { importMdx, type PageMetadata, renderMdxModule } from './mdx';
import { serializeMarkdown } from './render';

/**
 * Collects pages into a manifest and turns them into Markdown for a destination. Rendering keeps the Storefront's
 * routes in every link; they are resolved here, once every page is known, because where a link points depends on its
 * target: whether it has Markdown, and whether that differs per framework.
 */

/** A route of the Storefront without slashes (`developing/react/getting-started`) and the file it is rendered from. */
export type RouteSource = { route: string; file: string };

/**
 * Where a page sits in the Storefront's tree (`src/sitemap.tsx`), which every output derives its structure from.
 * - `category`: the top-level section, e.g. Developing; an output map may word its section differently.
 * - `reference`: the sitemap page. A skill writes one reference per sitemap page, with its tabs as sections.
 * - `tab`: the tab's title within that page; none for a page without tabs.
 */
export type PagePlace = {
  category: { route: string; title: string; description?: string };
  reference: { route: string; title: string };
  tab?: string;
};

/** A page written as Markdown: its route, its source file and its place in the tree. */
export type PageSource = RouteSource & { place: PagePlace };

/**
 * - `specific`: written for one framework, which it declares with `export const framework`.
 * - `independent`: renders the same for every framework.
 * - `switchable`: renders differently per framework, so it has one variant each.
 */
export type PageKind = 'specific' | 'independent' | 'switchable';

export type Page = PageSource & {
  metadata: PageMetadata;
  kind: PageKind;
  /** The frameworks the page applies to: its own when specific, all of them otherwise. */
  frameworks: Framework[];
  trees: Partial<Record<Framework, Root>>;
};

/** Every route of the Storefront, and the pages among them that have Markdown. */
export type Site = {
  hasRoute: (route: string) => boolean;
  pages: ReadonlyMap<string, Page>;
};

export type LinkTarget = { route: string; hash: string; page?: Page };

/** The page a link is in, and the framework of the file being written; none for the one file of an independent page. */
export type LinkSource = { page: Page; framework?: Framework };

export type LinkResolver = (target: LinkTarget, source: LinkSource) => string;

const PAGE_FILE = /^page\.(mdx|tsx|ts|jsx|js)$/;
const ROUTE_GROUP = /^\(.*\)$/;
const DYNAMIC_SEGMENT = /^\[.+\]$/;

/**
 * Every page of a Next.js app directory. Route groups like `(main)` are not part of the route, so
 * `app/(main)/developing/react/getting-started/page.mdx` is `developing/react/getting-started`.
 */
export const findPages = (appDir: string): RouteSource[] =>
  fs
    .readdirSync(appDir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && PAGE_FILE.test(entry.name))
    .map((entry) => ({
      route: path
        .relative(appDir, entry.parentPath)
        .split(path.sep)
        .filter((segment) => segment && !ROUTE_GROUP.test(segment))
        .join('/'),
      file: path.join(entry.parentPath, entry.name),
    }))
    .sort((a, b) => a.route.localeCompare(b.route));

/** A site from every route of the app and the pages collected for Markdown. Dynamic segments match any segment. */
export const createSite = (routes: readonly string[], pages: readonly Page[]): Site => {
  const staticRoutes = new Set(routes.filter((route) => !route.split('/').some((s) => DYNAMIC_SEGMENT.test(s))));
  const dynamicRoutes = routes
    .filter((route) => !staticRoutes.has(route))
    .map((route) => route.split('/').map((segment) => (DYNAMIC_SEGMENT.test(segment) ? null : segment)));

  return {
    hasRoute: (route) =>
      staticRoutes.has(route) ||
      dynamicRoutes.some((pattern) => {
        const segments = route.split('/');
        return segments.length === pattern.length && pattern.every((s, i) => s === null || s === segments[i]);
      }),
    pages: new Map(pages.map((page) => [page.route, page])),
  };
};

const isFramework = (value: unknown): value is Framework => FRAMEWORKS.includes(value as Framework);

/**
 * Imports and renders each page for every framework it applies to. Rendering is cheap once a page is compiled, so
 * whether it depends on the framework is found by comparing the results, not declared.
 */
export const collectPages = async (sources: readonly PageSource[]): Promise<Page[]> => {
  const pages: Page[] = [];
  for (const source of sources) {
    const mdxModule = await importMdx(source.file);
    const metadata = mdxModule.metadata ?? {};

    if (mdxModule.framework !== undefined) {
      if (!isFramework(mdxModule.framework)) {
        throw new Error(`${source.file}: \`framework\` must be one of ${FRAMEWORKS.join(', ')}.`);
      }
      const { framework } = mdxModule;
      const trees = { [framework]: renderMdxModule(source.file, mdxModule, framework) };
      pages.push({ ...source, metadata, kind: 'specific', frameworks: [framework], trees });
      continue;
    }

    const trees = Object.fromEntries(
      FRAMEWORKS.map((framework) => [framework, renderMdxModule(source.file, mdxModule, framework)])
    ) as Record<Framework, Root>;
    const [first, ...rest] = FRAMEWORKS.map((framework) => serializeMarkdown(trees[framework]));
    const kind = rest.every((markdown) => markdown === first) ? 'independent' : 'switchable';
    pages.push({ ...source, metadata, kind, frameworks: [...FRAMEWORKS], trees });
  }
  return pages;
};

const ROOT_RELATIVE = /^\/(?!\/)/;

const parseLink = (url: string): { route: string; hash: string } => {
  const [pathAndQuery, hash] = url.split('#');
  return {
    route: pathAndQuery.split('?')[0].replace(/^\/+|\/+$/g, ''),
    hash: hash === undefined ? '' : `#${hash}`,
  };
};

const forEachLink = (node: Nodes, visit: (node: { url: string }) => void): void => {
  if (node.type === 'link' || node.type === 'definition' || node.type === 'image') {
    visit(node);
  }
  if ('children' in node) {
    for (const child of node.children) {
      forEachLink(child, visit);
    }
  }
};

/** A page's title: its sitemap page's, followed by the tab's, e.g. `React: Getting Started`. */
export const pageTitle = ({ place }: Page): string =>
  place.tab ? `${place.reference.title}: ${place.tab}` : place.reference.title;

/** The anchor Markdown readers give a heading, as GitHub does: lower case, punctuation removed, each space a hyphen. */
export const headingAnchor = (heading: string): string =>
  heading
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-');

/**
 * A page's tree for one destination, with each Storefront route in its links resolved. Fails for a link to a route
 * that does not exist, so a renamed or removed page cannot leave broken links behind.
 *
 * @param framework the variant to write; none for the one file of an independent page.
 */
export const resolveLinks = (page: Page, framework: Framework | undefined, site: Site, resolve: LinkResolver): Root => {
  const tree = page.trees[framework ?? page.frameworks[0]];
  if (!tree) {
    throw new Error(`${page.file}: has no ${framework} variant.`);
  }
  const resolved = structuredClone(tree);
  const unknown: string[] = [];

  forEachLink(resolved, (node) => {
    if (!ROOT_RELATIVE.test(node.url)) {
      return;
    }
    const { route, hash } = parseLink(node.url);
    if (!site.hasRoute(route)) {
      unknown.push(node.url);
      return;
    }
    node.url = resolve({ route, hash, page: site.pages.get(route) }, { page, framework });
  });

  if (unknown.length > 0) {
    throw new Error(`${page.file}: links to routes that do not exist: ${unknown.join(', ')}`);
  }
  return resolved;
};

/** Serializes a page for one destination; see `resolveLinks`. */
export const pageToMarkdown = (
  page: Page,
  framework: Framework | undefined,
  site: Site,
  resolve: LinkResolver
): string => serializeMarkdown(resolveLinks(page, framework, site, resolve));
