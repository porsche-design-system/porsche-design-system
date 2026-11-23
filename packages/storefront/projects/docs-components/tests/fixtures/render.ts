import path from 'node:path';
import { FRAMEWORKS } from '@porsche-design-system/shared/models';
import { collectPages, createSite, htmlLink, mapLinks, type OutputMap, pageToMarkdown } from '../../src/renderer';

/**
 * Renders one fixture page within a small site of fixtures and prints its kind, metadata and the files written for it,
 * as JSON. The other routes stand for Storefront pages without Markdown, one of them dynamic.
 */

const [target] = process.argv.slice(2);
const SITE_PAGES = ['page', 'switchable', 'specific', 'links'];
const OTHER_ROUTES = ['partials/introduction', 'components/[component]'];

const routes = [...new Set([...SITE_PAGES, target])];
const pages = await collectPages(
  routes.map((route) => ({
    route,
    file: path.join(import.meta.dirname, `${route}.mdx`),
    place: { category: { route: 'fixtures', title: 'Fixtures' }, sitemapPage: { route, title: route } },
  }))
);
const site = createSite([...routes, ...OTHER_ROUTES], pages);
const page = pages.find(({ route }) => route === target);
if (!page) {
  throw new Error(`No fixture ${target}`);
}

/** Like the Storefront's Markdown: a file per page, one per framework where the page differs. */
const webMap: OutputMap = {
  locate: (page, framework) => ({
    file: page.kind === 'switchable' && framework ? `${page.route}.${framework}.md` : `${page.route}.md`,
  }),
};
const resolve = mapLinks({
  map: webMap,
  href: (file) => `/v4/${file}`,
  fallback: ({ route, hash }) => `${htmlLink('/v4', route)}${hash}`,
});

const variants = page.kind === 'switchable' ? FRAMEWORKS : [page.kind === 'specific' ? page.frameworks[0] : undefined];
const files = Object.fromEntries(
  variants.map((framework) => [
    webMap.locate(page, page.kind === 'switchable' ? framework : undefined)?.file,
    pageToMarkdown(page, framework, site, resolve),
  ])
);

process.stdout.write(JSON.stringify({ kind: page.kind, frameworks: page.frameworks, metadata: page.metadata, files }));
