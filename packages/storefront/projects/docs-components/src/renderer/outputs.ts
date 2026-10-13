import path from 'node:path';
import type { Heading, Root, RootContent } from 'mdast';
import type { Framework } from './define';
import { headingAnchor, type LinkResolver, type Page, resolveLinks, type Site } from './pages';
import { serializeMarkdown } from './render';

/**
 * Every output's structure is derived from the Storefront's tree (the sitemap) through an output map: by default with
 * one rule, by exception through overrides by route pattern. The map also words the output's index and is what links
 * resolve against, so an output's files, its index and its links cannot disagree.
 */

/** Where a page lands in an output: a file, the file's title and the section the page forms in it. */
export type Location = { file: string; title?: string; section?: string };

type Locate = (page: Page, framework: Framework | undefined) => Location | undefined;

export type OutputMapDefinition = {
  /** Where a page lands by default; `undefined` leaves it out of the output. */
  locate: Locate;
  /**
   * Exceptions by route pattern, where `*` matches one segment (`tailwindcss/*`): another location, or `false` to leave
   * the pages out of the output.
   */
  overrides?: Record<string, Locate | false>;
  /** The index's wording per category route (`developing`), in place of the sitemap's title and description. */
  categories?: Record<string, { title?: string; description?: string }>;
};

export type OutputMap = {
  locate: Locate;
  /** The title and description of a page's category in this output's index. */
  category: (page: Page) => { title: string; description?: string };
};

/** Whether a route matches a pattern of segments, where `*` matches any one segment. */
export const matchesRoute = (pattern: string, route: string): boolean => {
  const patternSegments = pattern.split('/');
  const routeSegments = route.split('/');
  return (
    patternSegments.length === routeSegments.length &&
    patternSegments.every((segment, index) => segment === '*' || segment === routeSegments[index])
  );
};

export const defineOutputMap = ({ locate, overrides = {}, categories = {} }: OutputMapDefinition): OutputMap => ({
  locate: (page, framework) => {
    const override = Object.entries(overrides).find(([pattern]) => matchesRoute(pattern, page.route))?.[1];
    if (override === false) {
      return undefined;
    }
    return (override ?? locate)(page, framework);
  },
  category: ({ place: { category } }) => ({
    title: categories[category.route]?.title ?? category.title,
    description: categories[category.route]?.description ?? category.description,
  }),
});

/** A file of an output: its location and the pages it holds, in order. */
export type OutputFile = { file: string; title?: string; pages: { page: Page; section?: string }[] };

/**
 * Groups pages by the file they land in, keeping their order. Fails when pages without a section share a file, which
 * would otherwise overwrite one another.
 */
export const outputFiles = (pages: readonly Page[], map: OutputMap, framework: Framework | undefined): OutputFile[] => {
  const files = new Map<string, OutputFile>();
  for (const page of pages) {
    const location = map.locate(page, framework);
    if (!location) {
      continue;
    }
    const file = files.get(location.file) ?? { file: location.file, title: location.title, pages: [] };
    file.pages.push({ page, section: location.section });
    files.set(location.file, file);
  }
  for (const file of files.values()) {
    if (file.pages.length > 1 && file.pages.some(({ section }) => !section)) {
      throw new Error(`${file.file}: holds several pages, so each needs a section in the output map.`);
    }
  }
  return [...files.values()];
};

const withoutTitle = (tree: Root): RootContent[] =>
  tree.children.filter((node, index) => !(index === 0 && node.type === 'heading' && node.depth === 1));

const demoted = (nodes: RootContent[]): RootContent[] =>
  nodes.map((node) =>
    node.type === 'heading' ? { ...node, depth: Math.min(node.depth + 1, 6) as Heading['depth'] } : node
  );

/**
 * Serializes a file of an output. A page without a section is the whole file. Pages with a section follow the file's
 * title, each under a heading of its section, their own headings one level down, so every section can be linked by
 * its anchor.
 */
export const outputFileToMarkdown = (
  { title, pages }: OutputFile,
  framework: Framework | undefined,
  site: Site,
  resolve: LinkResolver
): string => {
  const variant = (page: Page) => (page.kind === 'independent' ? undefined : (framework ?? page.frameworks[0]));
  const [first] = pages;
  if (pages.length === 1 && !first.section) {
    return serializeMarkdown(resolveLinks(first.page, variant(first.page), site, resolve));
  }

  const children: RootContent[] = title
    ? [{ type: 'heading', depth: 1, children: [{ type: 'text', value: title }] }]
    : [];
  for (const { page, section } of pages) {
    const content = withoutTitle(resolveLinks(page, variant(page), site, resolve));
    if (section) {
      children.push({ type: 'heading', depth: 2, children: [{ type: 'text', value: section }] }, ...demoted(content));
    } else {
      children.push(...content);
    }
  }
  return serializeMarkdown({ type: 'root', children });
};

/**
 * Links within an output: a target the map places in this output is linked at its file and section, everything else
 * goes to the fallback.
 *
 * @param framework the framework of the whole output (a skill); none to use the framework of the file being written.
 * @param href how a file is linked from another one: an absolute path on the web, a relative one in a skill.
 */
export const mapLinks =
  ({
    map,
    framework,
    href,
    fallback,
  }: {
    map: OutputMap;
    framework?: Framework;
    href: (from: string, to: string) => string;
    fallback: LinkResolver;
  }): LinkResolver =>
  (target, source) => {
    const outputFramework = framework ?? source.framework;
    const to = target.page && map.locate(target.page, outputFramework);
    const from = map.locate(source.page, outputFramework);
    if (!to || !from) {
      return fallback(target, source);
    }
    const anchor = target.hash || (to.section ? `#${headingAnchor(to.section)}` : '');
    if (from.file === to.file && anchor) {
      return anchor;
    }
    return `${href(from.file, to.file)}${anchor}`;
  };

/** Links from one file of an output to another, relative to the linking file. */
export const relativeHref = (from: string, to: string): string => {
  const relative = path.posix.relative(path.posix.dirname(from), to);
  return relative.startsWith('.') ? relative : `./${relative}`;
};

/** Links to the HTML page of a route, below a deployment's base path (`/pr-4777/partials/introduction/`). */
export const htmlLink = (prefix: string, route: string): string => `${prefix}/${route ? `${route}/` : ''}`;
