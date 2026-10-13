import path from 'node:path';
import {
  collectPages,
  createSite,
  defineOutputMap,
  FRAMEWORKS,
  htmlLink,
  mapLinks,
  pageToMarkdown,
  relativeHref,
} from '../../src/renderer';

/**
 * Renders one fixture page within a small site of fixtures and prints its kind, metadata and the files written for a
 * destination, as JSON. The other routes stand for Storefront pages without Markdown, one of them dynamic.
 */

const [target, destination = 'web'] = process.argv.slice(2);
const SITE_PAGES = ['page', 'switchable', 'specific', 'links'];
const OTHER_ROUTES = ['partials/introduction', 'components/[component]'];

const routes = [...new Set([...SITE_PAGES, target])];
const pages = await collectPages(
  routes.map((route) => ({
    route,
    file: path.join(import.meta.dirname, `${route}.mdx`),
    place: { category: { route: 'fixtures', title: 'Fixtures' }, reference: { route, title: route } },
  }))
);
const site = createSite([...routes, ...OTHER_ROUTES], pages);
const page = pages.find(({ route }) => route === target);
if (!page) {
  throw new Error(`No fixture ${target}`);
}

/** Like the Storefront's Markdown: a file per page, one per framework where the page differs. */
const webMap = defineOutputMap({
  locate: (page, framework) => ({
    file: page.kind === 'switchable' && framework ? `${page.route}.${framework}.md` : `${page.route}.md`,
  }),
});
/** Like a React skill: a file per page, only the pages for React. */
const skillMap = defineOutputMap({
  locate: (page) => (page.frameworks.includes('react') ? { file: `${page.route}.md` } : undefined),
});

const resolve =
  destination === 'web'
    ? mapLinks({
        map: webMap,
        href: (_, to) => `/v4/${to}`,
        fallback: ({ route, hash }) => `${htmlLink('/v4', route)}${hash}`,
      })
    : mapLinks({
        map: skillMap,
        framework: 'react',
        href: relativeHref,
        fallback: ({ route, hash }) => `${htmlLink('https://designsystem.porsche.com/v4.8.0', route)}${hash}`,
      });

const variants = page.kind === 'switchable' ? FRAMEWORKS : [page.kind === 'specific' ? page.frameworks[0] : undefined];
const files = Object.fromEntries(
  variants.map((framework) => [
    webMap.locate(page, page.kind === 'switchable' ? framework : undefined)?.file,
    pageToMarkdown(page, framework, site, resolve),
  ])
);

process.stdout.write(JSON.stringify({ kind: page.kind, frameworks: page.frameworks, metadata: page.metadata, files }));
