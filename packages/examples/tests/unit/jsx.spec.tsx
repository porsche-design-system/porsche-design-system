import fs from 'node:fs';
import path from 'node:path';
import { render } from 'preact-render-to-string';
import { describe, expect, it } from 'vitest';
import {
  exampleBanner,
  getScriptEntry,
  getSharedScripts,
  rewriteEntriesForDev,
  scriptEntryTag,
  sharedScripts,
} from '../../plugins/entries.ts';
import { doctype, isBuildInput, renderPage, resolvePagePath } from '../../plugins/jsx.ts';
import {
  getInputName,
  projects,
  resolvePageLocation,
  scriptEntryName,
  styleEntryName,
} from '../../plugins/projects.ts';
import {
  categoryItems,
  type NavItem,
  navItems,
  noticeText,
  patternItems,
  placeholderHref,
  templateItems,
} from '../../src/_data.ts';
import { type BehaviourId, behaviourIds, idAttribute, ids } from '../../src/_ids.ts';
import { BasePage } from '../../src/_layouts/BasePage.tsx';
import { OverviewPage } from '../../src/_layouts/OverviewPage.tsx';
import { PatternPage } from '../../src/_layouts/PatternPage.tsx';
import { ExampleList } from '../../src/_partials/ExampleList.tsx';
import { Footer } from '../../src/_partials/footer/Footer.tsx';
import { Head } from '../../src/_partials/Head.tsx';
import { Header } from '../../src/_partials/header/Header.tsx';
import IndexPage from '../../src/index.page.tsx';
import FooterPatternPage from '../../src/patterns/footer/index.page.tsx';
import HeaderOverlayPage from '../../src/patterns/header/overlay/index.page.tsx';
import HeaderStackedPage from '../../src/patterns/header/stacked/index.page.tsx';
import PatternsOverviewPage from '../../src/patterns/index.page.tsx';
import PopoverFeatureTourPage from '../../src/patterns/popover/feature-tour/index.page.tsx';
import PopoverLocalMarketSwitchPage from '../../src/patterns/popover/local-market-switch/index.page.tsx';
import PopoverPriorityNavigationPage from '../../src/patterns/popover/priority-navigation/index.page.tsx';
import TemplatesOverviewPage from '../../src/templates/index.page.tsx';
import LandingPage from '../../src/templates/landing-page/index.page.tsx';

const countOccurrences = (haystack: string, needle: string): number => haystack.split(needle).length - 1;

/** Every entry of the navigation tree, at any depth. */
const flattenNavItems = (items: NavItem[]): NavItem[] =>
  items.flatMap((item) => [item, ...flattenNavItems(item.children ?? [])]);

/**
 * A first level heading is either a plain `<h1>` or a `<p-heading tag="h1">`, which renders the `h1` in its shadow
 * root and therefore never appears in the static markup.
 */
const countFirstLevelHeadings = (html: string): number =>
  (html.match(/<h1[\s>]/g) ?? []).length + countOccurrences(html, 'tag="h1"');

/** Templates are built on `BasePage`: they own the full chrome, header and footer included. */
const templatePages = [['templates/landing-page', LandingPage]] as const;

/** Patterns are built on `PatternPage`: they show a single section in the place it occupies on a real page. */
const patternPages = [
  ['patterns/header/overlay', HeaderOverlayPage],
  ['patterns/header/stacked', HeaderStackedPage],
  ['patterns/footer', FooterPatternPage],
  ['patterns/popover/local-market-switch', PopoverLocalMarketSwitchPage],
  ['patterns/popover/priority-navigation', PopoverPriorityNavigationPage],
  ['patterns/popover/feature-tour', PopoverFeatureTourPage],
] as const;

const examplePages = [...templatePages, ...patternPages];

/** The overview pages: the one of the source tree and the one each generated project starts with. */
const overviewPages = [
  ['index', IndexPage],
  ['patterns', PatternsOverviewPage],
  ['templates', TemplatesOverviewPage],
] as const;

describe('resolvePagePath()', () => {
  it('should map the root URL to the index page', () => {
    expect(resolvePagePath('/')).toBe('index.page.tsx');
  });

  it('should map a nested directory URL to its index page', () => {
    expect(resolvePagePath('/templates/landing-page/')).toBe('templates/landing-page/index.page.tsx');
  });

  it('should map an explicit .html URL to its page', () => {
    expect(resolvePagePath('/patterns/header/overlay/index.html')).toBe('patterns/header/overlay/index.page.tsx');
  });

  it('should ignore query strings and hashes', () => {
    expect(resolvePagePath('/templates/landing-page/?foo=bar#features')).toBe('templates/landing-page/index.page.tsx');
  });

  it('should decode escaped characters', () => {
    expect(resolvePagePath('/landing%20page/')).toBe('landing page/index.page.tsx');
  });

  it.each(['/assets/styles.css', '/patterns/header/overlay/main.js', '/@vite/client'])(
    'should return undefined for the asset request "%s"',
    (url) => {
      expect(resolvePagePath(url)).toBeUndefined();
    }
  );
});

describe('isBuildInput()', () => {
  it.each(['src/_data.ts', 'src/_layouts/BasePage.tsx', 'src/_layouts/PatternPage.tsx', 'src/_partials/Head.tsx'])(
    'should detect "%s" as an input',
    (filePath) => {
      expect(isBuildInput('src', filePath)).toBe(true);
    }
  );

  it.each([
    'src/index.page.tsx',
    'src/templates/landing-page/index.page.tsx',
    'src/patterns/header/overlay/index.page.tsx',
    'src/assets/styles.css',
  ])('should not detect "%s" as an input', (filePath) => {
    expect(isBuildInput('src', filePath)).toBe(false);
  });
});

describe('projects', () => {
  it('should emit one project per category, each replacing a workspace of the examples repository', () => {
    expect(projects.map(({ category }) => category)).toEqual(['patterns', 'templates']);
    for (const { packageName, category } of projects) {
      expect(packageName).toBe(`@porsche-design-system/${category}`);
    }
  });

  it('should preview every project on its own port, none of them the one of the source tree', () => {
    const ports = projects.map(({ previewPort }) => previewPort);

    expect(new Set(ports).size).toBe(projects.length);
    expect(ports).not.toContain(3010);
  });

  it.each([
    ['patterns/index.page.tsx', { category: 'patterns', pageDir: '' }],
    ['patterns/footer/index.page.tsx', { category: 'patterns', pageDir: 'footer' }],
    ['patterns/header/overlay/index.page.tsx', { category: 'patterns', pageDir: 'header/overlay' }],
    ['templates/landing-page/index.page.tsx', { category: 'templates', pageDir: 'landing-page' }],
  ])('should locate "%s" inside its project', (relativePath, expected) => {
    expect(resolvePageLocation(relativePath)).toEqual(expected);
  });

  it.each(['index.page.tsx', 'assets/styles.css'])('should not locate "%s" in any project', (relativePath) => {
    expect(resolvePageLocation(relativePath)).toBeUndefined();
  });

  it.each([
    ['', 'index'],
    ['footer', 'footer'],
    ['header/overlay', 'header-overlay'],
  ])('should name the rollup input of "%s" "%s"', (pageDir, expected) => {
    expect(getInputName(pageDir)).toBe(expected);
  });
});

describe('entries', () => {
  const sharedStyles = fs.readFileSync(path.join(import.meta.dirname, '../../src/assets/styles.css'), 'utf8') as string;

  it('should keep the shared stylesheet free of relative paths, because it is copied next to every page', () => {
    // It is written to `src/`, `src/footer/` and `src/header/overlay/` alike, so a path out of the folder would
    // resolve differently in each. Tailwind scans the pages from the root of the project instead of being pointed
    // at them, which is why neither `@source` nor `source(none)` is needed.
    expect(sharedStyles).not.toMatch(/["(]\.{1,2}\//);
    expect(sharedStyles).not.toContain('@source');
    expect(sharedStyles).not.toContain('source(none)');
  });

  it('should import the stylesheet from the generated script, so a page references one file only', () => {
    expect(getScriptEntry({ sharedBehaviour: [] })).toBe("import './style.css';\n");
  });

  it('should inline the shared behaviour a page needs instead of importing it', () => {
    const entry = getScriptEntry({
      sharedBehaviour: [
        { fileName: 'header.js', content: `${exampleBanner}\n\nconst navButton = null;\n` },
        { fileName: 'video.js', content: `${exampleBanner}\n\nconst video = null;\n` },
      ],
    });

    expect(entry).not.toContain('import ../');
    expect(entry).toContain('const navButton = null;');
    expect(entry).toContain('const video = null;');
    // Named sections keep the single source findable, the banner is not repeated per snippet.
    expect(entry).toContain('// --- assets/header.js ---');
    expect(entry).toContain('// --- assets/video.js ---');
    expect(countOccurrences(entry, exampleBanner)).toBe(1);
  });

  it('should inline the behaviour authored next to a page, after the shared one', () => {
    const entry = getScriptEntry({
      behaviour: 'console.warn("hi");\n',
      sharedBehaviour: [{ fileName: 'header.js', content: 'const navButton = null;\n' }],
    });

    expect(entry).toBe(
      `import './style.css';\n\n${exampleBanner}\n\n// --- assets/header.js ---\n\nconst navButton = null;\n\n// --- behaviour of this example ---\n\nconsole.warn("hi");\n`
    );
  });

  it('should keep a single snippet unlabelled, so a one-behaviour example reads as one script', () => {
    const entry = getScriptEntry({ behaviour: 'console.warn("hi");\n', sharedBehaviour: [] });

    expect(entry).toBe(`import './style.css';\n\n${exampleBanner}\n\nconsole.warn("hi");\n`);
  });

  it('should fail when two inlined snippets declare the same name, which one module scope cannot hold', () => {
    expect(() =>
      getScriptEntry({
        behaviour: 'const video = null;\n',
        sharedBehaviour: [{ fileName: 'video.js', content: 'const video = null;\n' }],
      })
    ).toThrow(/both declare "video"/);
  });

  it.each([
    ['<p-button-pure id="nav-button"><p-drilldown id="nav-drilldown">', ['header.js']],
    ['<video id="hero-video"><p-button id="pause-button">', ['video.js']],
    [
      '<p-button-pure id="nav-button"><p-drilldown id="nav-drilldown"><video id="hero-video"><p-button id="pause-button">',
      ['header.js', 'video.js'],
    ],
    ['<p>nothing to wire up</p>', []],
  ])('should derive the shared behaviour of "%s" from the markup', (html, expected) => {
    expect(getSharedScripts(html)).toEqual(expected);
  });

  it.each([
    ['<p-drilldown id="nav-drilldown">', 'id="nav-button"'],
    ['<p-button id="pause-button">', 'id="hero-video"'],
  ])('should fail on "%s", which wires up only half of what a snippet needs', (html, missing) => {
    // A menu button without its drilldown, or a pause control without its video, is an example that silently does
    // nothing – the contract of `_ids.ts` is that a page renders the ids of a snippet together.
    expect(() => getSharedScripts(html)).toThrow(missing);
  });

  it('should link the shared stylesheet and drop the generated entry in dev, where neither exists', () => {
    const html = rewriteEntriesForDev(`<head></head><body>${scriptEntryTag}</body>`, {
      hasBehaviour: false,
      sharedScripts: ['header.js'],
    });

    expect(html).toContain('<link rel="stylesheet" href="/assets/styles.css" />');
    expect(html).toContain('<script type="module" src="/assets/header.js"></script>');
    expect(html).not.toContain(scriptEntryTag);
  });

  it('should keep the page entry in dev when the page has behaviour of its own', () => {
    const html = rewriteEntriesForDev(`<head></head><body>${scriptEntryTag}</body>`, {
      hasBehaviour: true,
      sharedScripts: [],
    });

    expect(html).toContain(scriptEntryTag);
  });

  // Regression: Vite's own HTML hook runs before the plugin hooks and warms up every `<script src>` it finds, so a
  // page still referencing its generated entry makes the dev server log "Failed to load url /main.js". The rewrite
  // therefore happens in the middleware of `jsxPages()`, before `server.transformIndexHtml()` sees the markup.
  it.each([...examplePages, ...overviewPages])(
    'should leave no reference to the generated entry in the dev markup of "%s"',
    async (_name, Page) => {
      const html = await renderPage(Page);

      expect(rewriteEntriesForDev(html, { hasBehaviour: false, sharedScripts: getSharedScripts(html) })).not.toContain(
        scriptEntryName
      );
    }
  );
});

describe('behaviour ids', () => {
  const srcDir = path.join(import.meta.dirname, '../../src');
  const snippets = sharedScripts.map(({ fileName, ids: scriptIds }) => ({
    fileName,
    ids: [...scriptIds] as BehaviourId[],
    code: fs.readFileSync(path.join(srcDir, 'assets', fileName), 'utf8') as string,
  }));

  /** Every id a snippet looks up, whether by `getElementById()` or by an `#id` selector. */
  const getQueriedIds = (code: string): string[] => [
    ...Array.from(code.matchAll(/getElementById\(\s*'([^']*)'\s*\)/g), ([, id]) => id),
    ...Array.from(code.matchAll(/querySelector(?:All)?\(\s*'#([^']*)'/g), ([, id]) => id),
  ];

  it('should register every id once, since a second one would silently win in the markup', () => {
    expect(new Set(behaviourIds).size).toBe(behaviourIds.length);
  });

  it('should wire every registered id up by exactly one snippet', () => {
    const declared = snippets.flatMap(({ ids: scriptIds }) => scriptIds);

    expect(new Set(declared).size).toBe(declared.length);
    expect([...declared].sort()).toEqual([...behaviourIds].sort());
  });

  it.each(snippets)('should address elements in $fileName by id only', ({ code }) => {
    // A snippet is inlined into the `main.js` of a page it knows nothing about, so a tag or class selector would
    // reach into whatever that page happens to render around the element.
    for (const [, selector] of code.matchAll(/querySelector(?:All)?\(\s*'([^']*)'/g)) {
      expect(selector.startsWith('#')).toBe(true);
    }
    expect(code).not.toMatch(/getElementsBy(?:ClassName|TagName)\(/);
  });

  it.each(snippets)('should look up exactly the ids $fileName is registered for', ({ code, ids: scriptIds }) => {
    expect(getQueriedIds(code).sort()).toEqual([...scriptIds].sort());
  });

  it('should keep the markup free of literal behaviour ids, which `_ids.ts` single-sources', () => {
    const files = (fs.readdirSync(srcDir, { recursive: true }) as string[]).filter((file) => file.endsWith('.tsx'));
    const offenders = files.filter((file) =>
      behaviourIds.some((id) => (fs.readFileSync(path.join(srcDir, file), 'utf8') as string).includes(idAttribute(id)))
    );

    expect(offenders).toEqual([]);
  });

  it.each(examplePages)(
    'should render the ids of a snippet in "%s" together, each of them once',
    async (_name, Page) => {
      const html = await renderPage(Page);

      for (const { ids: scriptIds } of snippets) {
        const counts = scriptIds.map((id) => countOccurrences(html, idAttribute(id)));

        // All of them or none of them – and never twice, because `getElementById()` would wire up the first one only.
        expect(new Set(counts).size).toBe(1);
        expect(counts[0]).toBeLessThanOrEqual(1);
      }
    }
  );

  it('should wire the menu button and its drilldown up on every page rendering the header', async () => {
    const html = await renderPage(HeaderStackedPage);

    expect(html).toContain(idAttribute(ids.navButton));
    expect(html).toContain(idAttribute(ids.navDrilldown));
    expect(getSharedScripts(html)).toEqual(['header.js']);
  });
});

describe('behaviour authored next to a page', () => {
  const srcDir = path.join(import.meta.dirname, '../../src');

  const readSharedBehaviour = (html: string) =>
    getSharedScripts(html).map((fileName) => ({
      fileName,
      content: fs.readFileSync(path.join(srcDir, 'assets', fileName), 'utf8') as string,
    }));

  /** The pages carrying a `main.js` of their own – behaviour exactly one example needs. */
  const pagesWithBehaviour = examplePages
    .map(([name]) => [name, path.join(srcDir, name, scriptEntryName)] as const)
    .filter(([, filePath]) => fs.existsSync(filePath))
    .map(([name, filePath]) => [name, fs.readFileSync(filePath, 'utf8') as string] as const);

  it('should exist, since single-use behaviour does not belong in the shared folder', () => {
    // `assets/` holds what more than one page needs, selected by a detection rule on the ids of `_ids.ts`. A snippet
    // there has to address elements by id only and register every id it looks up – neither of which is possible nor
    // meaningful for behaviour belonging to exactly one example.
    expect(pagesWithBehaviour.length).toBeGreaterThan(0);
  });

  it.each(pagesWithBehaviour)('should keep the behaviour of "%s" a fragment, not an entry', (_name, code) => {
    // The generated entry brings the stylesheet and the banner. In dev the file is served straight from the source
    // tree, where the `style.css` it would import does not exist at all.
    expect(code).not.toContain(styleEntryName);
    expect(code).not.toContain(exampleBanner);
  });

  it.each(examplePages)('should generate the entry of "%s" from what the page renders', async (name, Page) => {
    const html = await renderPage(Page);
    const behaviour = pagesWithBehaviour.find(([pageName]) => pageName === name)?.[1];

    // The very call `scripts/build.ts` makes: it throws when a page's own behaviour declares a top level name one of
    // the inlined snippets already declares, since the two end up in a single module scope.
    expect(() => getScriptEntry({ behaviour, sharedBehaviour: readSharedBehaviour(html) })).not.toThrow();
  });
});

describe('data', () => {
  it.each([
    ['template', templateItems],
    ['pattern', patternItems],
  ])('should keep every %s href relative to its own project', (_name, items) => {
    for (const item of items) {
      expect(item.href.startsWith('/')).toBe(false);
      expect(item.href.startsWith('patterns/')).toBe(false);
      expect(item.href.startsWith('templates/')).toBe(false);
      expect(item.href.endsWith('/')).toBe(true);
    }
  });

  it('should keep the chrome navigation on placeholder links', () => {
    for (const item of [...flattenNavItems(navItems), ...categoryItems]) {
      expect(item.href).toBe('#');
    }
  });

  it('should keep every navigation id unique, because the drilldown identifies its levels by them', () => {
    const ids = flattenNavItems(navItems).map((item) => item.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('renderPage()', () => {
  it('should prepend the doctype', async () => {
    expect(await renderPage(IndexPage)).toMatch(new RegExp(`^${doctype}\\n<html lang="en">`));
  });

  it('should format the output instead of emitting a single line', async () => {
    const html = await renderPage(IndexPage);

    expect(html.split('\n').length).toBeGreaterThan(20);
    expect(html).toMatch(/\n {2}<head>\n {4}<meta charset="utf-8" \/>/);
    expect(html.endsWith('\n')).toBe(true);
  });

  it('should escape interpolated values', async () => {
    const html = await renderPage(() => (
      <BasePage title={'<script>alert("x")</script> & more'} description="Escaping check" currentPage="home">
        <main id="main">
          <h1>Escaping</h1>
        </main>
      </BasePage>
    ));

    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script');
    expect(html).toContain('&amp; more');
  });

  it('should not leak framework specific attribute names into the markup', async () => {
    const html = await renderPage(LandingPage);

    expect(html).not.toContain('className');
    expect(html).not.toContain('htmlFor');
    expect(html).toContain('class="');
  });
});

describe('Head', () => {
  const html = render(<Head title="Contact page" description="A description." />);

  it('should suffix the document title', () => {
    expect(html).toContain('<title>Contact page | Dummy Patterns</title>');
  });

  it('should render the description meta tag', () => {
    expect(html).toContain('<meta name="description" content="A description."');
  });

  it('should not link a stylesheet, which the generated entry of the page brings instead', () => {
    expect(html).not.toContain('<link rel="stylesheet"');
  });
});

describe('Header', () => {
  const variants = ['overlay', 'stacked'] as const;

  it.each(variants)('should render the same navigation in the %s variant', (variant) => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch variant={variant} />);

    expect(countOccurrences(html, '<header')).toBe(1);
    expect(countOccurrences(html, '<nav aria-label="Main">')).toBe(1);
    expect(countOccurrences(html, 'aria-current="page"')).toBe(1);
    for (const item of flattenNavItems(navItems)) {
      expect(html).toContain(item.label);
    }
  });

  it.each(variants)(
    'should mark no item in the %s variant when the current page is not part of the navigation',
    (variant) => {
      expect(render(<Header currentPage="nothing" navItems={navItems} variant={variant} />)).not.toContain(
        'aria-current'
      );
    }
  );

  it.each(variants)('should link nowhere in the %s variant, because the chrome is a demonstration', (variant) => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch variant={variant} />);

    // Every URL in the header – the navigation, the meta actions, the crest and the wordmark – is the placeholder.
    for (const [, url] of html.matchAll(/href="([^"]*)"/g)) {
      expect(url).toBe(placeholderHref);
    }
  });

  it.each(variants)('should render one drilldown level per nested item in the %s variant', (variant) => {
    const html = render(<Header currentPage="home" navItems={navItems} variant={variant} />);
    const items = flattenNavItems(navItems);

    expect(countOccurrences(html, '<p-drilldown-item')).toBe(items.filter((item) => item.children).length);
    for (const item of items.filter((item) => item.children)) {
      expect(html).toContain(`identifier="${item.id}"`);
    }
  });

  it('should render one link per entry, a level being reachable through its own overview entry', () => {
    const html = render(<Header currentPage="home" navItems={navItems} />);

    expect(countOccurrences(html, '<p-drilldown-link')).toBe(flattenNavItems(navItems).length);
    expect(html).toContain('Home overview');
  });

  it('should keep a top level entry without children a link rather than a level', () => {
    const html = render(<Header currentPage="contact" navItems={navItems} />);

    expect(html).not.toContain('identifier="contact"');
    expect(html).toContain('aria-current="page">Contact</a>');
  });

  it('should hide the search affordance by default', () => {
    for (const variant of variants) {
      expect(render(<Header currentPage="home" navItems={navItems} variant={variant} />)).not.toContain(
        'icon="search"'
      );
    }
  });

  it.each(variants)('should render the named search affordance when requested in the %s variant', (variant) => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch variant={variant} />);

    expect(html).toContain('icon="search"');
    expect(html).toContain('>Search</p-button-pure>');
  });

  it('should give the menu button an accessible name and announce what it opens', () => {
    const html = render(<Header currentPage="home" navItems={navItems} />);

    expect(html).toContain('>Menu</p-button-pure>');
    expect(html).toContain('aria-haspopup');
  });

  it('should reduce the overlay variant to the bar it lies on top of the content with', () => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch />);

    expect(html).toContain('<header class="z-1');
    expect(html).not.toContain('<nav aria-label="Categories">');
    expect(html).not.toContain(noticeText);
    // A shop navigation belongs to the stacked variant; the overlay one stays on the essentials.
    expect(html).not.toContain('icon="shopping-cart"');
  });

  it('should put the dark scheme of the overlay variant on the elements lying on the hero', () => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch />);

    // The menu button, the crest, the wordmark and the two meta actions – and nothing else.
    expect(countOccurrences(html, 'scheme-dark')).toBe(5);
    expect(html).toContain('<p-crest class="sm:hidden scheme-dark"');
  });

  it('should keep the drilldown of the overlay variant out of that scheme, since it is a dialog on the page', () => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch />);
    const closingTag = '</p-drilldown>';
    const drilldown = html.slice(html.indexOf('<p-drilldown '), html.indexOf(closingTag) + closingTag.length);

    // Neither on the drilldown itself nor on anything it contains, and no ancestor carries it either: the scheme
    // never reaches the `header` or the `nav`.
    expect(drilldown).toContain(closingTag);
    expect(drilldown).not.toContain('scheme-');
    expect(html).not.toContain('<header class="scheme-dark');
    expect(html).not.toContain('<nav aria-label="Main" class=');
  });

  it('should leave the scheme of the stacked variant to its rows', () => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch variant="stacked" />);

    // Only the note is an island of its own; the bar sits on the page background.
    expect(countOccurrences(html, 'scheme-dark')).toBe(1);
    expect(html).toContain('<p-crest class="sm:hidden"');
  });

  it('should add the note and the category navigation in the stacked variant', () => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch variant="stacked" />);

    expect(html).toContain(noticeText);
    expect(html).toContain('<nav class="col-full');
    expect(html).toContain('aria-label="Categories"');
    for (const item of categoryItems) {
      // The labels are interpolated, so an ampersand arrives escaped – "Bags & Luggage" is the check for that.
      expect(html).toContain(item.label.replaceAll('&', '&amp;'));
    }
    expect(html).toContain('icon="shopping-cart"');
  });
});

describe('Footer', () => {
  const html = render(<Footer />);

  it('should render a labelled navigation landmark', () => {
    expect(html).toContain('aria-label="Footer"');
  });

  it('should link nowhere, because the footer demonstrates a navigation', () => {
    for (const [, url] of html.matchAll(/href="([^"]*)"/g)) {
      expect(url).toBe(placeholderHref);
    }
  });
});

describe('ExampleList', () => {
  const html = render(<ExampleList basePath="./" items={patternItems} label="Patterns" />);

  it('should render a labelled navigation landmark', () => {
    expect(html).toContain('<nav aria-label="Patterns">');
  });

  it('should link every item against the base path', () => {
    for (const item of patternItems) {
      expect(html).toContain(`href="./${item.href}"`);
      expect(html).toContain(item.label);
    }
  });

  it('should render one described entry per item', () => {
    expect(countOccurrences(html, '<li>')).toBe(patternItems.length);
    expect(html).toContain(patternItems[0].description);
  });
});

describe('BasePage', () => {
  const renderBasePage = (props: Partial<Parameters<typeof BasePage>[0]> = {}) =>
    render(
      <BasePage title="Title" description="Description" currentPage="home" {...props}>
        <main id="main">
          <h1>Content</h1>
        </main>
      </BasePage>
    );

  it('should render the landmarks in document order', () => {
    const html = renderBasePage();

    expect(html.indexOf('<header')).toBeLessThan(html.indexOf('<main'));
    expect(html.indexOf('<main')).toBeLessThan(html.indexOf('<footer'));
  });

  it('should render the header as the first element of the body', () => {
    expect(renderBasePage()).toContain('<body><header');
  });

  it('should reference exactly one script, the entry generated next to the page', () => {
    const html = renderBasePage();

    expect(countOccurrences(html, '<script')).toBe(1);
    expect(html).toContain(scriptEntryTag);
  });

  it('should render the children inside the body', () => {
    expect(renderBasePage()).toContain('<main id="main"><h1>Content</h1></main>');
  });

  it('should fall back to the shared navigation', () => {
    expect(countOccurrences(renderBasePage(), '<p-drilldown-link')).toBe(flattenNavItems(navItems).length);
  });

  it('should let a page override the shared navigation', () => {
    const html = renderBasePage({ navItems: [{ id: 'only', href: '#', label: 'Only item' }] });

    expect(html).toContain('Only item');
    expect(html).not.toContain('Features');
  });

  it('should forward the header variant', () => {
    expect(renderBasePage({ headerVariant: 'stacked' })).toContain('aria-label="Categories"');
  });
});

describe('PatternPage', () => {
  const renderPatternPage = (props: Partial<Parameters<typeof PatternPage>[0]> = {}) =>
    render(
      <PatternPage title="Pattern" description="Description" {...props}>
        <main id="main">
          <h1>Pattern</h1>
          <p>Notes</p>
        </main>
      </PatternPage>
    );

  it('should render the pattern passed as beforeMain above the content', () => {
    const html = renderPatternPage({ beforeMain: <header>Pattern</header> });

    expect(html.indexOf('<header')).toBeLessThan(html.indexOf('<main'));
  });

  it('should render the pattern passed as afterMain below the content', () => {
    const html = renderPatternPage({ afterMain: <footer>Pattern</footer> });

    expect(html.indexOf('<main')).toBeLessThan(html.indexOf('<footer'));
  });

  it('should leave the main landmark to the page', () => {
    const html = renderPatternPage();

    expect(html).toContain('<main id="main">');
  });

  it('should render the page content, and nothing the layout adds around it', () => {
    const html = renderPatternPage();

    expect(html).toContain('<p>Notes</p>');
    expect(html).not.toContain('<a ');
  });

  it('should reference exactly one script, the entry generated next to the page', () => {
    const html = renderPatternPage();

    expect(countOccurrences(html, '<script')).toBe(1);
    expect(html).toContain(scriptEntryTag);
  });

  it('should not ship the shared chrome, which is what a pattern demonstrates', () => {
    const html = renderPatternPage();

    expect(html).not.toContain('<nav aria-label="Main">');
    expect(html).not.toContain('aria-label="Footer"');
  });
});

describe('OverviewPage', () => {
  const html = render(
    <OverviewPage title="Title" description="Description" heading="Heading" intro="Intro">
      <section>content</section>
    </OverviewPage>
  );

  it('should be a main landmark with the only heading of the page', () => {
    expect(html).toContain('<main id="main"');
    expect(countOccurrences(html, '<h1')).toBe(1);
  });

  it('should reference the entry generated next to it, like every other page', () => {
    expect(html).toContain(scriptEntryTag);
  });
});

describe.each(overviewPages)('%s overview page', (_name, Page) => {
  it('should render one main landmark and one first level heading', async () => {
    const html = await renderPage(Page);

    expect(countOccurrences(html, '<main')).toBe(1);
    expect(countOccurrences(html, '<h1')).toBe(1);
  });

  it('should not ship the demo chrome', async () => {
    const html = await renderPage(Page);

    expect(html).not.toContain('<header');
    expect(html).not.toContain('<footer');
    expect(html).not.toContain('<nav aria-label="Main">');
  });

  it('should only contain links that go somewhere', async () => {
    expect(await renderPage(Page)).not.toContain('href="#"');
  });
});

describe('overview pages', () => {
  it('should link both categories from the source tree overview, prefixed with the category', async () => {
    const html = await renderPage(IndexPage);

    expect(html).toContain('<nav aria-label="Templates">');
    expect(html).toContain('<nav aria-label="Patterns">');
    for (const item of templateItems) {
      expect(html).toContain(`href="./templates/${item.href}"`);
    }
    for (const item of patternItems) {
      expect(html).toContain(`href="./patterns/${item.href}"`);
    }
  });

  it.each([
    ['patterns', PatternsOverviewPage, patternItems],
    ['templates', TemplatesOverviewPage, templateItems],
  ])('should link the examples of the %s project relative to its own root', async (_name, Page, items) => {
    const html = await renderPage(Page);

    for (const item of items) {
      expect(html).toContain(`href="./${item.href}"`);
    }
  });
});

describe.each(examplePages)('%s page', (_name, Page) => {
  it('should render exactly one main landmark and at most one first level heading', async () => {
    const html = await renderPage(Page);

    expect(countOccurrences(html, '<main')).toBe(1);
    // A pattern showing nothing but its own section – the footer – has no heading of its own; every other page has
    // exactly one. The suites below pin down which of the two a page is.
    expect(countFirstLevelHeadings(html)).toBeLessThanOrEqual(1);
  });

  it('should ship the accessibility baseline', async () => {
    const html = await renderPage(Page);

    expect(html).toContain('id="main"');
  });

  it('should reference the entry the build generates next to it', async () => {
    expect(await renderPage(Page)).toContain(scriptEntryTag);
  });

  it('should not leave any template syntax in the output', async () => {
    const html = await renderPage(Page);

    expect(html).not.toMatch(/\{\{|\}\}|\{%|%\}|<!--\s*@/);
  });
});

describe.each(templatePages)('%s page', (_name, Page) => {
  it('should render the full chrome exactly once', async () => {
    const html = await renderPage(Page);

    expect(countOccurrences(html, '<header')).toBe(1);
    expect(countOccurrences(html, '<footer')).toBe(1);
    expect(html).toContain('<nav aria-label="Main">');
  });

  it('should title its content with a first level heading, being a whole page', async () => {
    expect(countFirstLevelHeadings(await renderPage(Page))).toBe(1);
  });
});

describe.each(patternPages)('%s page', (_name, Page) => {
  it('should show the pattern on its own, without chrome the layout adds around it', async () => {
    const html = await renderPage(Page);

    expect(html).not.toContain('Back to the overview');
    expect(html).not.toContain('Skip to content');
  });
});

describe('landing page', () => {
  it('should extend the shared navigation with an in-page anchor that exists', async () => {
    const html = await renderPage(LandingPage);

    expect(html).toContain('href="#features"');
    expect(html).toContain('id="features"');
    expect(countOccurrences(html, 'aria-current="page"')).toBe(1);
  });

  it('should give its video a labelled pause control, which the shared behaviour wires up', async () => {
    const html = await renderPage(LandingPage);

    expect(html).toContain('id="pause-button"');
    expect(getSharedScripts(html)).toContain('video.js');
  });
});

describe('header patterns', () => {
  it('should render the overlay variant on overlay', async () => {
    const html = await renderPage(HeaderOverlayPage);

    expect(html).toContain('<p-drilldown id="nav-drilldown">');
    expect(html).toContain('icon="search"');
    expect(html).not.toContain('aria-label="Categories"');
    expect(html).not.toContain(noticeText);
  });

  it('should need the shared header and video behaviour, both derived from the markup', async () => {
    expect(getSharedScripts(await renderPage(HeaderOverlayPage))).toEqual(['header.js', 'video.js']);
  });

  it('should render the stacked variant with its extra rows on stacked', async () => {
    const html = await renderPage(HeaderStackedPage);

    expect(html).toContain(noticeText);
    expect(html).toContain('aria-label="Categories"');
  });

  it('should share the very same navigation between both patterns', async () => {
    const [html1, html2] = await Promise.all([renderPage(HeaderOverlayPage), renderPage(HeaderStackedPage)]);

    for (const html of [html1, html2]) {
      expect(countOccurrences(html, '<p-drilldown-item')).toBe(
        flattenNavItems(navItems).filter((item) => item.children).length
      );
      expect(html).toContain('<nav aria-label="Main">');
    }
  });

  it('should keep the hero below the header, whose heading the pattern needs to be shown against', async () => {
    const [html1, html2] = await Promise.all([renderPage(HeaderOverlayPage), renderPage(HeaderStackedPage)]);

    for (const html of [html1, html2]) {
      expect(countFirstLevelHeadings(html)).toBe(1);
    }
  });
});

describe('footer pattern', () => {
  it('should show the footer below the content, without a header', async () => {
    const html = await renderPage(FooterPatternPage);

    expect(countOccurrences(html, '<footer')).toBe(1);
    expect(html).not.toContain('<header');
    expect(html.indexOf('<main')).toBeLessThan(html.indexOf('<footer'));
  });

  it('should keep the main landmark empty, so the footer is shown without a heading above it', async () => {
    const html = await renderPage(FooterPatternPage);

    expect(html).toContain('<main id="main"></main>');
    expect(countFirstLevelHeadings(html)).toBe(0);
    expect(html).not.toContain('<p-heading tag="h1"');
  });
});

describe('popover patterns', () => {
  it('should build the local market switch on the shared header blocks, not on a copy of the bar', async () => {
    const html = await renderPage(PopoverLocalMarketSwitchPage);

    expect(html).toContain('<nav aria-label="Main">');
    expect(html).toContain(idAttribute(ids.navDrilldown));
    // The bar, the navigation and the brand come from `_partials/header/`; only the meta actions are the pattern.
    expect(html).toContain('<p-crest class="sm:hidden scheme-dark"');
    expect(html).not.toContain('icon="shopping-cart"');
  });

  it('should keep the dark scheme of the local market switch off the popovers it opens', async () => {
    const html = await renderPage(PopoverLocalMarketSwitchPage);
    const closingTag = '</p-popover>';
    const marketPopover = html.slice(html.indexOf('<p-popover id="market-popover"'), html.indexOf(closingTag));

    // A popover is a dialog on top of the page, not part of the bar, so the scheme reaches its trigger and nothing
    // else – on the wrapper it would cascade into the panel and open a dark flyout on a light page.
    expect(marketPopover).toContain('class="scheme-dark p-static-xs -m-static-xs"');
    expect(countOccurrences(marketPopover, 'scheme-dark')).toBe(1);
    expect(html).not.toContain('<header class="scheme-dark');
  });

  it('should render the profile menu in both containers it can appear in', async () => {
    const html = await renderPage(PopoverLocalMarketSwitchPage);

    // The popover above `s`, the sheet below it – one body, rendered twice, so the two cannot drift apart.
    expect(countOccurrences(html, 'Find Connect Services')).toBe(2);
    expect(html.indexOf('<main')).toBeLessThan(html.indexOf('<p-sheet'));
  });

  it('should need the shared header and video behaviour of the local market switch, derived from the markup', async () => {
    expect(getSharedScripts(await renderPage(PopoverLocalMarketSwitchPage))).toEqual(['header.js', 'video.js']);
  });

  it('should collapse the priority navigation into a trigger that is not shown while nothing overflows', async () => {
    const html = await renderPage(PopoverPriorityNavigationPage);

    expect(html).toContain('<li id="more-trigger" class="ms-auto" hidden>');
    expect(html).toContain(`aria="{ 'aria-expanded': false }"`);
    // The entries live in the bar; the popover starts empty because `main.js` moves the very same elements into it.
    expect(html).toContain('<ul id="overflow-list"');
    expect(countOccurrences(html, 'Some Item')).toBe(9);
  });

  it('should walk the feature tour through one coachmark per affordance, the first one open', async () => {
    const html = await renderPage(PopoverFeatureTourPage);
    const steps = countOccurrences(html, 'data-tour-step');

    expect(steps).toBe(4);
    expect(html).toContain('<p-popover class="[--p-popover-w:20rem]" open data-tour-step');
    expect(countOccurrences(html, 'open data-tour-step')).toBe(1);
    // Every step can be skipped and continued; only the first one has nothing to go back to.
    expect(countOccurrences(html, 'data-tour="skip"')).toBe(steps);
    expect(countOccurrences(html, 'data-tour="next"')).toBe(steps);
    expect(countOccurrences(html, 'data-tour="back"')).toBe(steps - 1);
    expect(html).toContain('Step 4 of 4');
    expect(html).toContain('>Done</p-button>');
  });

  it.each([
    ['priority navigation', PopoverPriorityNavigationPage],
    ['feature tour', PopoverFeatureTourPage],
  ])('should keep the %s on its own behaviour, with no shared snippet to inline', async (_name, Page) => {
    expect(getSharedScripts(await renderPage(Page))).toEqual([]);
  });
});
