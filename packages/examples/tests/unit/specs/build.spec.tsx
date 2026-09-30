import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'preact';
import { render } from 'preact-render-to-string';
import { describe, expect, it } from 'vitest';
import {
  dedent,
  exampleBanner,
  extractScripts,
  getScriptEntry,
  linkStylesForDev,
  scriptEntryTag,
} from '../../../plugins/entries.ts';
import { escapeInlineScript, escapeInlineStyle, inlineBundle } from '../../../plugins/inline.ts';
import { doctype, normalizeClassAttributes, renderPage, resolvePagePath } from '../../../plugins/jsx.ts';
import { getStackblitzPayload } from '../../../plugins/payload.ts';
import { categories, getPageId, resolvePageLocation, scriptEntryName } from '../../../plugins/projects.ts';
import { getPackageJson, getViteConfig } from '../../../scripts/generateProject.ts';
import { BasePage } from '../../../src/_layouts/BasePage.tsx';
import { examplesPath, media, mediaPath } from '../../../src/_media.ts';
import IndexPage from '../../../src/index.page.tsx';
import LandingPage from '../../../src/templates/landing-page/index.page.tsx';
import { countOccurrences, examplePages, overviewPages } from '../helpers/index.ts';

/**
 * The build pipeline: how a URL maps to a page, how a page becomes a project, what that project and its StackBlitz
 * payload contain, how its entry is generated and inlined, and what `renderPage()` emits.
 *
 * None of this is visible to the Playwright suites, which only ever open the finished page: the dev server, the
 * project StackBlitz opens and every way the build is meant to fail are covered here or nowhere.
 */

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

describe('projects', () => {
  it('should know the two categories, none of them named like the media folder next to them', () => {
    expect(categories.map(({ category }) => category)).toEqual(['patterns', 'templates']);
    // The storefront serves `public/examples/{patterns,templates,media}/` side by side.
    expect(categories.map(({ category }) => `${examplesPath}${category}/`)).not.toContain(mediaPath);
  });

  it.each([
    ['patterns/footer/index.page.tsx', { category: 'patterns', pageDir: 'footer' }],
    ['patterns/header/overlay/index.page.tsx', { category: 'patterns', pageDir: 'header/overlay' }],
    ['templates/landing-page/index.page.tsx', { category: 'templates', pageDir: 'landing-page' }],
  ])('should locate "%s" as a page of its category', (relativePath, expected) => {
    expect(resolvePageLocation(relativePath)).toEqual(expected);
  });

  // A page at the root of a category would be a project containing every other page of it – the build rejects it.
  it.each(['index.page.tsx', 'patterns/index.page.tsx', 'assets/styles.css'])(
    'should not locate "%s" as a page',
    (relativePath) => {
      expect(resolvePageLocation(relativePath)).toBeUndefined();
    }
  );

  it.each([
    [{ category: 'patterns', pageDir: 'footer' }, 'patterns-footer'],
    [{ category: 'patterns', pageDir: 'header/overlay' }, 'patterns-header-overlay'],
  ] as const)('should name the page %o "%s"', (location, expected) => {
    expect(getPageId(location)).toBe(expected);
  });
});

describe('generated project', () => {
  const [patterns] = categories;
  const location = { category: 'patterns', pageDir: 'header/overlay' } as const;
  const versions = {
    '@porsche-design-system/components-js': '1.0.0',
    tailwindcss: '4.0.0',
    '@tailwindcss/vite': '4.0.0',
    '@types/node': '26.0.0',
    lightningcss: '1.0.0',
    vite: '8.0.0',
  };

  it('should name the package after the page', () => {
    expect(JSON.parse(getPackageJson(location, versions)).name).toBe(
      '@porsche-design-system/example-patterns-header-overlay'
    );
  });

  it('should keep the Vite config to what a single page needs, so it builds in StackBlitz as it builds here', () => {
    const config = getViteConfig(patterns);

    // `index.html` next to the config is Vite's default input, and the project root is where the config is.
    expect(config).not.toContain('rollupOptions');
    expect(config).not.toContain('root:');
    expect(config).not.toContain('base:');
    expect(config).not.toContain('publicDir');
    expect(config).not.toContain('import.meta.dirname');
    expect(config).toContain('getLoaderScript()');
  });

  it('should never add the inline plugin to the project StackBlitz opens', () => {
    expect(getViteConfig(patterns)).not.toContain('inlineEntries');
  });
});

describe('media', () => {
  it('should reference a file below the path the storefront serves the media from', () => {
    expect(media('718.webp')).toBe('/examples/media/718.webp');
    expect(mediaPath.startsWith(examplesPath)).toBe(true);
  });

  it.each(examplePages)('should reference the media of "%s" only through media()', async (_name, Page) => {
    const html = await renderPage(Page);
    const rootAbsolute = Array.from(html.matchAll(/\s(?:src|href|poster|srcset)="(\/[^/"][^"]*)"/g), ([, url]) => url);

    for (const url of rootAbsolute) {
      expect(url.startsWith(mediaPath)).toBe(true);
    }
  });
});

describe('inline plugin', () => {
  const asset = (fileName: string, source: string) => ({ type: 'asset' as const, fileName, source });
  const chunk = (fileName: string, code: string) => ({ type: 'chunk' as const, fileName, code });

  /** A bundle as Vite hands it over, with the tags it emits for the script entry and the stylesheet. */
  const getBundle = (html: string, files: ReturnType<typeof asset | typeof chunk>[]) =>
    Object.fromEntries(
      [asset('index.html', html), ...files].map((file) => [file.fileName, file])
    ) as unknown as Parameters<typeof inlineBundle>[0];

  const viteHtml =
    '<html><head><script type="module" crossorigin src="/assets/index-a1.js"></script><link rel="stylesheet" crossorigin href="/assets/index-b2.css"></head><body></body></html>';

  it('should inline the script and the stylesheet and drop the emitted files', () => {
    const bundle = getBundle(viteHtml, [chunk('assets/index-a1.js', 'go();\n'), asset('assets/index-b2.css', 'a{}')]);

    inlineBundle(bundle);

    expect(Object.keys(bundle)).toEqual(['index.html']);
    expect(String((bundle['index.html'] as { source: string }).source)).toBe(
      '<html><head><script type="module">go();</script><style>a{}</style></head><body></body></html>'
    );
  });

  it('should find the tags whatever the order of their attributes', () => {
    const html =
      '<head><script src="./assets/x.js" type="module"></script><link href="./assets/y.css" rel="stylesheet"></head>';
    const bundle = getBundle(html, [chunk('assets/x.js', 'x()'), asset('assets/y.css', 'b{}')]);

    inlineBundle(bundle);

    expect(String((bundle['index.html'] as { source: string }).source)).toBe(
      '<head><script type="module">x()</script><style>b{}</style></head>'
    );
  });

  it('should inline a page without behaviour, whose empty entry Vite drops', () => {
    const bundle = getBundle('<head><link rel="stylesheet" href="/assets/y.css"></head>', [
      asset('assets/y.css', 'b{}'),
    ]);

    inlineBundle(bundle);

    expect(String((bundle['index.html'] as { source: string }).source)).toBe('<head><style>b{}</style></head>');
  });

  it.each([
    ['an imported asset', [chunk('assets/index-a1.js', ''), asset('assets/big.webp', '')]],
    ['a second chunk', [chunk('assets/index-a1.js', ''), chunk('assets/lazy.js', '')]],
    ['a second stylesheet', [chunk('assets/index-a1.js', ''), asset('a.css', ''), asset('b.css', '')]],
  ])('should fail the build on %s instead of inlining it silently', (_name, files) => {
    expect(() => inlineBundle(getBundle(viteHtml, files))).toThrow('a page has to build to one HTML file');
  });

  it('should fail the build when the page does not reference the emitted script', () => {
    expect(() => inlineBundle(getBundle('<head></head>', [chunk('assets/index-a1.js', '')]))).toThrow(
      'expected exactly one <script> referencing "assets/index-a1.js", found 0'
    );
  });

  it('should keep inlined code from ending its element early', () => {
    expect(escapeInlineScript("const s = '</script><!-- x';")).toBe("const s = '\\x3C/script>\\x3C!-- x';");
    expect(escapeInlineStyle('a::after{content:"</style>"}')).toBe('a::after{content:"<\\/style>"}');
  });
});

describe('StackBlitz payload', () => {
  const html =
    '<html><head><title>Header 1 &amp; more | Dummy Patterns</title><meta\n  name="description"\n  content="A &quot;header&quot;."\n/></head></html>';

  it('should carry the files of the project verbatim, named after the page', () => {
    const files = { 'index.html': html, 'main.js': 'x' };

    expect(getStackblitzPayload(files)).toEqual({
      title: 'Header 1 & more | Dummy Patterns',
      description: 'A "header".',
      files,
    });
  });

  it('should fail for a page without title or description', () => {
    expect(() => getStackblitzPayload({ 'index.html': '<html></html>' })).toThrow('<title>');
    expect(() => getStackblitzPayload({})).toThrow('<title>');
  });
});

describe('entries', () => {
  const sharedStyles = fs.readFileSync(
    path.join(import.meta.dirname, '../../../src/assets/styles.css'),
    'utf8'
  ) as string;

  it('should keep the shared stylesheet free of relative paths, because it is copied next to every page', () => {
    // It is written to `src/`, `src/footer/` and `src/header/overlay/` alike, so a path out of the folder would
    // resolve differently in each. Tailwind scans the pages from the root of the project instead of being pointed
    // at them, which is why neither `@source` nor `source(none)` is needed.
    expect(sharedStyles).not.toMatch(/["(]\.{1,2}\//);
    expect(sharedStyles).not.toContain('@source');
    expect(sharedStyles).not.toContain('source(none)');
  });

  it('should import the stylesheet from the generated script, so a page references one file only', () => {
    expect(getScriptEntry([])).toBe("import './style.css';\n");
  });

  it('should write the scripts of a page into its entry in document order, under one banner', () => {
    const entry = getScriptEntry(['// header\nconst navButton = null;', '// page\nconsole.warn("hi");']);

    expect(entry).toBe(
      `import './style.css';\n\n${exampleBanner}\n\n// header\nconst navButton = null;\n\n// page\nconsole.warn("hi");\n`
    );
  });

  it('should hoist the imports of the scripts next to the stylesheet import, each of them once', () => {
    const statement = "import { componentsReady } from '@porsche-design-system/components-js';";
    const entry = getScriptEntry([`${statement}\n\ngo();`, `${statement}\ngoOn();`]);

    expect(entry.startsWith(`import './style.css';\n${statement}\n\n${exampleBanner}\n\ngo();\n\ngoOn();`)).toBe(true);
    expect(countOccurrences(entry, statement)).toBe(1);
  });

  it('should fail when two scripts declare the same name, which one module scope cannot hold', () => {
    expect(() => getScriptEntry(['// video\nconst video = null;', '// page\nconst video = null;'])).toThrow(
      /both declare "video"[\s\S]*\/\/ video[\s\S]*\/\/ page/
    );
  });

  it('should move the inline scripts out of the page and link the entry at the end of the body instead', () => {
    const { html, scripts } = extractScripts(
      [
        '<html>',
        '  <body>',
        '    <nav>',
        '      <script type="module">',
        '        // first',
        '        if (a) {',
        '          go();',
        '        }',
        '      </script>',
        '    </nav>',
        '    <script type="module">',
        '      second();',
        '    </script>',
        '  </body>',
        '</html>',
        '',
      ].join('\n')
    );

    expect(scripts).toEqual(['// first\nif (a) {\n  go();\n}', 'second();']);
    expect(html).toBe(`<html>\n  <body>\n    <nav>\n    </nav>\n    ${scriptEntryTag}\n  </body>\n</html>\n`);
  });

  it('should fail on a page without a body, which has no place for its entry', () => {
    expect(() => extractScripts('<p>no layout</p>')).toThrow('</body>');
  });

  it('should keep blank lines inside a script and drop the ones around it', () => {
    expect(dedent('\n\n    a();\n\n      b();\n  \n')).toBe('a();\n\n  b();');
  });

  it.each(examplePages)('should give back the scripts of "%s" exactly as they are authored', async (_name, Page) => {
    // `renderPage()` indents every script to the depth of its element, which `dedent()` undoes. Compared with the
    // unformatted render, any other change of the formatter – quotes, wrapping, semicolons – would show up here.
    const authored = Array.from(
      render(createElement(Page, {})).matchAll(/<script type="module">([\s\S]*?)<\/script>/g),
      ([, code]) => dedent(code)
    );
    const { html, scripts } = extractScripts(await renderPage(Page));

    expect(scripts).toEqual(authored);
    expect(html).not.toContain('<script type="module">');
    expect(countOccurrences(html, scriptEntryTag)).toBe(1);
  });

  it.each(examplePages)('should fit the scripts of "%s" into one entry', async (_name, Page) => {
    const { scripts } = extractScripts(await renderPage(Page));

    // The very calls `scripts/build.ts` makes: it throws when two scripts of a page declare the same top level name,
    // since they end up in a single module scope – in dev each of them is a module of its own and would not tell.
    expect(() => getScriptEntry(scripts)).not.toThrow();
  });

  it('should link the shared stylesheet in dev, where no entry imports it', () => {
    expect(linkStylesForDev('<head></head><body></body>')).toBe(
      '<head><link rel="stylesheet" href="/assets/styles.css" /></head><body></body>'
    );
  });

  // Regression: Vite's own HTML hook runs before the plugin hooks and warms up every `<script src>` it finds, so a
  // page referencing the generated entry would make the dev server log "Failed to load url /main.js". Only the build
  // links the entry.
  it.each([...examplePages, ...overviewPages])(
    'should leave no reference to the generated entry in the dev markup of "%s"',
    async (_name, Page) => {
      expect(linkStylesForDev(await renderPage(Page))).not.toContain(scriptEntryName);
    }
  );
});

describe('renderPage()', () => {
  it('should trim and collapse class attributes, so an unset class in a template literal leaves no space', () => {
    expect(normalizeClassAttributes('<p class="a  b "></p><i class=" "></i><b class="c"></b>')).toBe(
      '<p class="a b"></p><i></i><b class="c"></b>'
    );
  });

  it('should leave the content of scripts alone, since it is code rather than markup', () => {
    const html = '<script type="module">el.innerHTML = \'<b class="a  b">\';</script><p class=" x"></p>';

    expect(normalizeClassAttributes(html)).toBe(
      '<script type="module">el.innerHTML = \'<b class="a  b">\';</script><p class="x"></p>'
    );
  });

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

  // The four layouts all funnel through `Head`, and this is what pins that down: a layout rendering its own `<head>`
  // would silently ship an indexable page, which nothing else here would catch.
  it.each([...examplePages, ...overviewPages])('should mark "%s" as noindex', async (_name, Page) => {
    expect(await renderPage(Page)).toContain('<meta name="robots" content="noindex"');
  });
});
