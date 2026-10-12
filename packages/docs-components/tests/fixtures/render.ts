import path from 'node:path';
import {
  collectPages,
  createSite,
  FRAMEWORKS,
  markdownFile,
  pageToMarkdown,
  skillLinks,
  webLinks,
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
  routes.map((route) => ({ route, file: path.join(import.meta.dirname, `${route}.mdx`) }))
);
const site = createSite([...routes, ...OTHER_ROUTES], pages);
const page = pages.find(({ route }) => route === target);
if (!page) {
  throw new Error(`No fixture ${target}`);
}
const resolve = destination === 'web' ? webLinks('v4') : skillLinks({ framework: 'react', version: '4.8.0' });

const files =
  page.kind === 'switchable'
    ? Object.fromEntries(
        FRAMEWORKS.map((framework) => [markdownFile(page, framework), pageToMarkdown(page, framework, site, resolve)])
      )
    : {
        [markdownFile(page)]: pageToMarkdown(
          page,
          page.kind === 'specific' ? page.frameworks[0] : undefined,
          site,
          resolve
        ),
      };

process.stdout.write(JSON.stringify({ kind: page.kind, frameworks: page.frameworks, metadata: page.metadata, files }));
