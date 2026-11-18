import type { Root } from 'mdast';
import { describe, expect, it } from 'vitest';
import {
  createSite,
  defineOutputMap,
  headingAnchor,
  htmlLink,
  mapLinks,
  matchesRoute,
  outputFiles,
  outputFileToMarkdown,
  type Page,
  pageTitle,
  relativeHref,
} from '../src/renderer';

const tab = (page: string, tabTitle: string, framework: 'react' | 'vue', children: Root['children']): Page => ({
  route: `developing/${page}/${headingAnchor(tabTitle)}`,
  file: `developing/${page}/${headingAnchor(tabTitle)}/page.mdx`,
  metadata: {},
  kind: 'specific',
  frameworks: [framework],
  trees: { [framework]: { type: 'root', children } },
  place: {
    category: { route: 'developing', title: 'Developing', description: 'For people.' },
    reference: { route: `developing/${page}`, title: page === 'react' ? 'React' : 'Vue' },
    tab: tabTitle,
  },
});

const link = (url: string, text: string): Root['children'][number] => ({
  type: 'paragraph',
  children: [{ type: 'link', url, children: [{ type: 'text', value: text }] }],
});

const GETTING_STARTED = tab('react', 'Getting Started', 'react', [
  { type: 'heading', depth: 1, children: [{ type: 'text', value: 'React' }] },
  { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Quick start' }] },
  link('/developing/react/form/', 'Forms'),
]);
const FORM = tab('react', 'Form', 'react', [
  { type: 'heading', depth: 1, children: [{ type: 'text', value: 'React' }] },
  link('/developing/vue/getting-started/', 'Vue'),
]);
const VUE = tab('vue', 'Getting Started', 'vue', [link('/developing/react/form/', 'Form')]);

const PAGES = [GETTING_STARTED, FORM, VUE];
const SITE = createSite(
  PAGES.map(({ route }) => route),
  PAGES
);

/** Like a React skill: a file per sitemap page, tabs as sections, only React's pages. */
const skillMap = defineOutputMap({
  locate: ({ place, frameworks }) =>
    frameworks.includes('react')
      ? { file: `references/${place.reference.route}.md`, title: place.reference.title, section: place.tab }
      : undefined,
  categories: { developing: { title: 'Frameworks', description: 'For agents.' } },
});
const skillLinks = mapLinks({
  map: skillMap,
  framework: 'react',
  href: relativeHref,
  fallback: ({ route }) => htmlLink('https://designsystem.porsche.com/v4.8.0', route),
});

describe('outputFileToMarkdown', () => {
  it('writes a file with its pages as sections, their headings one level down, linked through the map', () => {
    const [react] = outputFiles(PAGES, skillMap, 'react');

    expect(outputFileToMarkdown(react, 'react', SITE, skillLinks)).toBe(
      [
        '# React',
        '',
        '## Getting Started',
        '',
        '### Quick start',
        '',
        '[Forms](#form)',
        '',
        '## Form',
        '',
        '[Vue](https://designsystem.porsche.com/v4.8.0/developing/vue/getting-started/)',
        '',
      ].join('\n')
    );
  });
});

describe('mapLinks', () => {
  it('links a section in another file of the output relative to the linking file', () => {
    const elsewhere = { ...VUE, frameworks: ['react'], place: { ...VUE.place } } satisfies Page;

    expect(skillLinks({ route: FORM.route, hash: '', page: FORM }, { page: elsewhere })).toBe('./react.md#form');
  });
});

describe('defineOutputMap', () => {
  it('relocates pages by route pattern, leaves pages out with false and words the index', () => {
    const map = defineOutputMap({
      locate: ({ route }) => ({ file: `${route}.md` }),
      overrides: {
        'developing/react/*': ({ place }) => ({ file: 'react.md', section: place.tab }),
        'developing/vue/getting-started': false,
      },
      categories: { developing: { title: 'Frameworks' } },
    });

    expect(map.locate(FORM, undefined)).toEqual({ file: 'react.md', section: 'Form' });
    expect(map.locate(VUE, undefined)).toBeUndefined();
    expect(map.category(FORM)).toEqual({ title: 'Frameworks', description: 'For people.' });
    expect(skillMap.category(FORM)).toEqual({ title: 'Frameworks', description: 'For agents.' });
  });
});

describe('outputFiles', () => {
  it('fails when pages without a section share a file', () => {
    const map = defineOutputMap({ locate: () => ({ file: 'all.md' }) });

    expect(() => outputFiles(PAGES, map, undefined)).toThrow('all.md: holds several pages');
  });
});

describe('matchesRoute', () => {
  it('matches one segment per star', () => {
    expect(matchesRoute('developing/*/getting-started', 'developing/react/getting-started')).toBe(true);
    expect(matchesRoute('developing/*', 'developing/react/getting-started')).toBe(false);
  });
});

describe('pageTitle and headingAnchor', () => {
  it('names a tab after its page and anchors it the way Markdown readers do', () => {
    expect(pageTitle(GETTING_STARTED)).toBe('React: Getting Started');
    expect(headingAnchor('Astro + Vue (optional)')).toBe('astro--vue-optional');
  });
});
