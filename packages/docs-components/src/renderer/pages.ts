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

/** A page of the Storefront: its route without slashes (`developing/react/getting-started`) and its source file. */
export type PageSource = { route: string; file: string };

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
export const findPages = (appDir: string): PageSource[] =>
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

/**
 * The file a page's Markdown is written to: `<route>.md`, or `<route>.<framework>.md` for a variant of a switchable
 * page. Without a framework, a switchable page's `<route>.md` is the index of its variants.
 */
export const markdownFile = (page: Page, framework?: Framework): string =>
  page.kind === 'switchable' && framework ? `${page.route}.${framework}.md` : `${page.route}.md`;

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

/**
 * Serializes a page for one destination, resolving each Storefront route in its links. Fails for a link to a route
 * that does not exist, so a renamed or removed page cannot leave broken links behind.
 *
 * @param framework the variant to write; none for the one file of an independent page.
 */
export const pageToMarkdown = (
  page: Page,
  framework: Framework | undefined,
  site: Site,
  resolve: LinkResolver
): string => {
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
  return serializeMarkdown(resolved);
};

const STOREFRONT_ORIGIN = 'https://designsystem.porsche.com';

/**
 * Links for the Storefront's own Markdown: to the Markdown of the same deployment where the target has some (for a
 * switchable target, the variant of the framework being written), to its HTML page otherwise.
 *
 * @param basePath the deployment's path, e.g. `v4.8.0` or `pr-4777`; empty when served from the root.
 */
export const webLinks =
  (basePath: string): LinkResolver =>
  ({ route, hash, page }, { framework }) => {
    const prefix = basePath ? `/${basePath}` : '';
    if (!page) {
      return `${prefix}/${route ? `${route}/` : ''}${hash}`;
    }
    return `${prefix}/${markdownFile(page, framework)}${hash}`;
  };

/** Where a page is written in a skill: `references/<route>.md`. */
export const skillReference = (route: string): string => `references/${route}.md`;

/**
 * Links for a framework's skill: relative to the reference being written where the target is in the skill, otherwise
 * to the Markdown (or HTML page) of the Storefront for the exact version the skill was generated for.
 */
export const skillLinks =
  ({ framework, version }: { framework: Framework; version: string }): LinkResolver =>
  ({ route, hash, page }, source) => {
    if (page?.frameworks.includes(framework)) {
      const from = path.posix.dirname(skillReference(source.page.route));
      const relative = path.posix.relative(from, skillReference(route));
      return `${relative.startsWith('.') ? relative : `./${relative}`}${hash}`;
    }
    const target = page ? markdownFile(page, framework) : `${route ? `${route}/` : ''}`;
    return `${STOREFRONT_ORIGIN}/v${version}/${target}${hash}`;
  };
