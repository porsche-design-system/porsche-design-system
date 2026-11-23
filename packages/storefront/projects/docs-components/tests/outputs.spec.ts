import { describe, expect, it } from 'vitest';
import { htmlLink, mapLinks, type OutputMap, type Page, pageTitle } from '../src/renderer';

const page = (route: string, kind: Page['kind'], tab?: string): Page => ({
  route,
  file: `${route}/page.mdx`,
  metadata: {},
  kind,
  frameworks: kind === 'specific' ? ['react'] : ['vanilla-js', 'angular', 'react', 'vue'],
  trees: {},
  place: {
    category: { route: 'developing', title: 'Developing' },
    sitemapPage: { route: 'developing/react', title: 'React' },
    tab,
  },
});

const GETTING_STARTED = page('developing/react/getting-started', 'specific', 'Getting Started');
const SWITCHABLE = page('components/button/usage', 'switchable');

/** Like the Storefront's Markdown: a file per page, one per framework where the page differs. */
const map: OutputMap = {
  locate: (page, framework) => ({
    file: page.kind === 'switchable' && framework ? `${page.route}.${framework}.md` : `${page.route}.md`,
  }),
};
const resolve = mapLinks({
  map,
  href: (file) => `/v4/${file}`,
  fallback: ({ route, hash }) => `${htmlLink('/v4', route)}${hash}`,
});

describe('mapLinks', () => {
  it('links the file the map places the target in, in the framework of the linking file', () => {
    const source = { page: GETTING_STARTED, framework: 'react' as const };

    expect(resolve({ route: SWITCHABLE.route, hash: '#do', page: SWITCHABLE }, source)).toBe(
      '/v4/components/button/usage.react.md#do'
    );
  });

  it('keeps only the anchor for a section of the same file', () => {
    const source = { page: GETTING_STARTED, framework: 'react' as const };

    expect(resolve({ route: GETTING_STARTED.route, hash: '#integration', page: GETTING_STARTED }, source)).toBe(
      '#integration'
    );
  });

  it('falls back for a route without Markdown', () => {
    expect(resolve({ route: 'partials/introduction', hash: '' }, { page: GETTING_STARTED })).toBe(
      '/v4/partials/introduction/'
    );
  });
});

describe('pageTitle', () => {
  it('names a tab after its sitemap page', () => {
    expect(pageTitle(GETTING_STARTED)).toBe('React: Getting Started');
    expect(pageTitle({ ...GETTING_STARTED, place: { ...GETTING_STARTED.place, tab: undefined } })).toBe('React');
  });
});

describe('htmlLink', () => {
  it('links the HTML page of a route below the base path', () => {
    expect(htmlLink('/pr-4777', 'partials/introduction')).toBe('/pr-4777/partials/introduction/');
    expect(htmlLink('', '')).toBe('/');
  });
});
