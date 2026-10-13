import {
  defineOutputMap,
  type Framework,
  htmlLink,
  type LinkResolver,
  mapLinks,
} from '@porsche-design-system/docs-components/markdown';

/**
 * The structure of the Storefront's Markdown, derived from the sitemap: each page next to its HTML
 * (`developing/react/getting-started.md`), and one file per framework for a page that differs per framework
 * (`components/button/usage.react.md`), whose plain `.md` is then the index of those files. `llms.txt` is its index.
 */
export const markdownMap = defineOutputMap({
  locate: (page, framework?: Framework) => ({
    file: page.kind === 'switchable' && framework ? `${page.route}.${framework}.md` : `${page.route}.md`,
  }),
});

/**
 * Links within the Storefront's Markdown: to the Markdown of the same deployment, or to the HTML page of a route
 * without Markdown.
 *
 * @param prefix where the deployment is served, e.g. `/pr-4777`; empty at the root.
 */
export const markdownLinks = (prefix: string): LinkResolver =>
  mapLinks({
    map: markdownMap,
    href: (_, to) => `${prefix}/${to}`,
    fallback: ({ route, hash }) => `${htmlLink(prefix, route)}${hash}`,
  });
