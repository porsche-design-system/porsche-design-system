import { render } from 'preact-render-to-string';
import { describe, expect, it } from 'vitest';
import { doctype, isBuildInput, renderPage, resolvePagePath } from '../../plugins/jsx.ts';
import { footerNavItems, navItems, patternItems, templateItems } from '../../src/_data.ts';
import { BasePage } from '../../src/_layouts/BasePage.tsx';
import { PatternPage } from '../../src/_layouts/PatternPage.tsx';
import { ExampleList } from '../../src/_partials/ExampleList.tsx';
import { Footer } from '../../src/_partials/Footer.tsx';
import { Head } from '../../src/_partials/Head.tsx';
import { Header } from '../../src/_partials/Header.tsx';
import { SkipLink } from '../../src/_partials/SkipLink.tsx';
import IndexPage from '../../src/index.page.tsx';
import Header1Page from '../../src/patterns/header-1/index.page.tsx';
import Header2Page from '../../src/patterns/header-2/index.page.tsx';
import ContactPage from '../../src/templates/contact-page/index.page.tsx';
import LandingPage from '../../src/templates/landing-page/index.page.tsx';

const countOccurrences = (haystack: string, needle: string): number => haystack.split(needle).length - 1;

/** Templates are built on `BasePage`: they own the full chrome, header and footer included. */
const templatePages = [
  ['templates/landing-page', LandingPage],
  ['templates/contact-page', ContactPage],
] as const;

/** Patterns are built on `PatternPage`: they show a single section in the place it occupies on a real page. */
const patternPages = [
  ['patterns/header-1', Header1Page],
  ['patterns/header-2', Header2Page],
] as const;

const examplePages = [...templatePages, ...patternPages];

describe('resolvePagePath()', () => {
  it('should map the root URL to the index page', () => {
    expect(resolvePagePath('/')).toBe('index.page.tsx');
  });

  it('should map a nested directory URL to its index page', () => {
    expect(resolvePagePath('/templates/landing-page/')).toBe('templates/landing-page/index.page.tsx');
  });

  it('should map an explicit .html URL to its page', () => {
    expect(resolvePagePath('/templates/contact-page/index.html')).toBe('templates/contact-page/index.page.tsx');
  });

  it('should ignore query strings and hashes', () => {
    expect(resolvePagePath('/templates/landing-page/?foo=bar#features')).toBe('templates/landing-page/index.page.tsx');
  });

  it('should decode escaped characters', () => {
    expect(resolvePagePath('/landing%20page/')).toBe('landing page/index.page.tsx');
  });

  it.each(['/assets/styles.css', '/templates/contact-page/main.js', '/@vite/client'])(
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
    'src/patterns/header-1/index.page.tsx',
    'src/assets/styles.css',
  ])('should not detect "%s" as an input', (filePath) => {
    expect(isBuildInput('src', filePath)).toBe(false);
  });
});

describe('data', () => {
  it.each([
    ['template', templateItems, 'templates/'],
    ['pattern', patternItems, 'patterns/'],
  ])('should keep every %s href inside its category folder', (_name, items, prefix) => {
    for (const item of items) {
      expect(item.href.startsWith(prefix)).toBe(true);
      expect(item.href.endsWith('/')).toBe(true);
    }
  });

  it('should keep the chrome navigation on placeholder links', () => {
    for (const item of [...navItems, ...footerNavItems]) {
      expect(item.href).toBe('#');
    }
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
      <BasePage
        basePath="./"
        title={'<script>alert("x")</script> & more'}
        description="Escaping check"
        currentPage="home"
      >
        <h1>Escaping</h1>
      </BasePage>
    ));

    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script');
    expect(html).toContain('&amp; more');
  });

  it('should not leak framework specific attribute names into the markup', async () => {
    const html = await renderPage(ContactPage);

    expect(html).not.toContain('className');
    expect(html).not.toContain('htmlFor');
    expect(html).toContain('class="');
    expect(html).toContain('for="name"');
  });
});

describe('Head', () => {
  const html = render(<Head basePath="../../" title="Contact page" description="A description." />);

  it('should suffix the document title', () => {
    expect(html).toContain('<title>Contact page | Dummy Patterns</title>');
  });

  it('should render the description meta tag', () => {
    expect(html).toContain('<meta name="description" content="A description."');
  });

  it('should resolve the stylesheet against the base path', () => {
    expect(html).toContain('href="../../assets/styles.css"');
  });
});

describe('SkipLink', () => {
  it('should target the main landmark', () => {
    const html = render(<SkipLink />);

    expect(html).toContain('href="#main"');
    expect(html).toContain('Skip to content');
  });
});

describe('Header', () => {
  it('should mark only the current page with aria-current', () => {
    const html = render(<Header currentPage="contact" navItems={navItems} />);

    expect(countOccurrences(html, 'aria-current="page"')).toBe(1);
    expect(html).toContain('aria-current="page"');
  });

  it('should mark no item when the current page is not part of the navigation', () => {
    expect(render(<Header currentPage="nothing" navItems={navItems} />)).not.toContain('aria-current');
  });

  it('should render one link per navigation item', () => {
    const html = render(<Header currentPage="home" navItems={navItems} />);

    expect(countOccurrences(html, '<li>')).toBe(navItems.length);
    for (const item of navItems) {
      expect(html).toContain(item.label);
    }
  });

  it('should link nowhere, because the chrome is a demonstration', () => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch />);

    expect(countOccurrences(html, 'href="#"')).toBe(navItems.length + 1); // navigation plus the brand
    expect(html).toContain('action="#"');
  });

  it('should hide the search form by default', () => {
    expect(render(<Header currentPage="home" navItems={navItems} />)).not.toContain('role="search"');
  });

  it('should render the labelled search form when requested', () => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch />);

    expect(html).toContain('role="search"');
    expect(html).toContain('<label class="sr-only" for="site-search">');
    expect(html).toContain('id="site-search"');
  });

  it('should render a labelled navigation landmark', () => {
    expect(render(<Header currentPage="home" navItems={navItems} />)).toContain('<nav aria-label="Main">');
  });

  it('should leave the skip link to the page shell', () => {
    expect(render(<Header currentPage="home" navItems={navItems} />)).not.toContain('Skip to content');
  });

  it.each(['single-row', 'stacked'] as const)('should render the same content in the %s variant', (variant) => {
    const html = render(<Header currentPage="home" navItems={navItems} showSearch variant={variant} />);

    expect(countOccurrences(html, '<header')).toBe(1);
    expect(countOccurrences(html, '<nav aria-label="Main">')).toBe(1);
    expect(countOccurrences(html, '<li>')).toBe(navItems.length);
    expect(countOccurrences(html, 'aria-current="page"')).toBe(1);
    expect(html).toContain('role="search"');
  });

  it('should put the navigation on its own row in the stacked variant', () => {
    expect(render(<Header currentPage="home" navItems={navItems} variant="stacked" />)).toContain(
      'border-t border-line px-6 py-3'
    );
  });
});

describe('Footer', () => {
  const html = render(<Footer footerNavItems={footerNavItems} />);

  it('should render a labelled navigation landmark', () => {
    expect(html).toContain('<nav aria-label="Footer">');
  });

  it('should render one placeholder link per item', () => {
    expect(countOccurrences(html, 'href="#"')).toBe(footerNavItems.length);
    for (const item of footerNavItems) {
      expect(html).toContain(item.label);
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
      <BasePage basePath="../../" title="Title" description="Description" currentPage="home" {...props}>
        <h1>Content</h1>
      </BasePage>
    );

  it('should render the landmarks in document order', () => {
    const html = renderBasePage();

    expect(html.indexOf('<header')).toBeLessThan(html.indexOf('<main'));
    expect(html.indexOf('<main')).toBeLessThan(html.indexOf('<footer'));
  });

  it('should render the skip link as the first element of the body', () => {
    expect(renderBasePage()).toContain('<body><a class="absolute top-2 start-2');
  });

  it('should resolve the stylesheet against the base path', () => {
    expect(renderBasePage()).toContain('href="../../assets/styles.css"');
  });

  it('should render the children inside the main landmark', () => {
    expect(renderBasePage()).toContain('<main id="main"><h1>Content</h1></main>');
  });

  it('should omit the class attribute when no main class is given', () => {
    expect(renderBasePage()).toContain('<main id="main">');
  });

  it('should apply the main class when given', () => {
    expect(renderBasePage({ mainClass: 'max-w-2xl' })).toContain('<main id="main" class="max-w-2xl">');
  });

  it('should omit the page script by default', () => {
    expect(renderBasePage()).not.toContain('<script');
  });

  it('should render the deferred page script when given', () => {
    expect(renderBasePage({ pageScript: 'main.js' })).toContain('<script src="main.js" defer></script>');
  });

  it('should fall back to the shared navigation', () => {
    expect(countOccurrences(renderBasePage(), '<li>')).toBe(navItems.length + footerNavItems.length);
  });

  it('should let a page override the shared navigation', () => {
    const html = renderBasePage({ navItems: [{ id: 'only', href: '#', label: 'Only item' }] });

    expect(html).toContain('Only item');
    expect(html).not.toContain('Features');
  });

  it('should forward the header variant', () => {
    expect(renderBasePage({ headerVariant: 'stacked' })).toContain('border-t border-line px-6 py-3');
  });
});

describe('PatternPage', () => {
  const renderPatternPage = (props: Partial<Parameters<typeof PatternPage>[0]> = {}) =>
    render(
      <PatternPage basePath="../../" title="Pattern" description="Description" {...props}>
        <p>Notes</p>
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

  it('should render the skip link and the main landmark', () => {
    const html = renderPatternPage();

    expect(html).toContain('Skip to content');
    expect(html).toContain('id="main"');
  });

  it('should describe the pattern and link back to the overview', () => {
    const html = renderPatternPage();

    expect(html).toContain('Pattern</h1>');
    expect(html).toContain('<p>Notes</p>');
    expect(html).toContain('href="../../">Back to the overview');
  });

  it('should not ship the shared chrome, which is what a pattern demonstrates', () => {
    const html = renderPatternPage();

    expect(html).not.toContain('<nav aria-label="Main">');
    expect(html).not.toContain('<nav aria-label="Footer">');
  });
});

describe('overview page', () => {
  it('should render one main landmark and one first level heading', async () => {
    const html = await renderPage(IndexPage);

    expect(countOccurrences(html, '<main')).toBe(1);
    expect(countOccurrences(html, '<h1')).toBe(1);
  });

  it('should not ship the demo chrome', async () => {
    const html = await renderPage(IndexPage);

    expect(html).not.toContain('<header');
    expect(html).not.toContain('<footer');
    expect(html).not.toContain('<nav aria-label="Main">');
  });

  it('should list every template and every pattern in a labelled navigation', async () => {
    const html = await renderPage(IndexPage);

    expect(html).toContain('<nav aria-label="Templates">');
    expect(html).toContain('<nav aria-label="Patterns">');
    for (const item of [...templateItems, ...patternItems]) {
      expect(html).toContain(`href="./${item.href}"`);
    }
  });

  it('should be the only page with links that go somewhere', async () => {
    expect(await renderPage(IndexPage)).not.toContain('href="#"');
  });
});

describe.each(examplePages)('%s page', (_name, Page) => {
  it('should render exactly one main landmark and one first level heading', async () => {
    const html = await renderPage(Page);

    expect(countOccurrences(html, '<main')).toBe(1);
    expect(countOccurrences(html, '<h1')).toBe(1);
  });

  it('should ship the accessibility baseline', async () => {
    const html = await renderPage(Page);

    expect(html).toContain('Skip to content');
    expect(html).toContain('id="main"');
    expect(html).toContain('<nav aria-label="Main">');
  });

  it('should render the header exactly once, above the content', async () => {
    const html = await renderPage(Page);

    expect(countOccurrences(html, '<header')).toBe(1);
    expect(html.indexOf('<header')).toBeLessThan(html.indexOf('<main'));
  });

  it('should not leave any template syntax in the output', async () => {
    const html = await renderPage(Page);

    expect(html).not.toMatch(/\{\{|\}\}|\{%|%\}|<!--\s*@/);
  });
});

describe.each(templatePages)('%s page', (_name, Page) => {
  it('should render the full chrome exactly once', async () => {
    const html = await renderPage(Page);

    expect(countOccurrences(html, '<footer')).toBe(1);
    expect(html).toContain('<nav aria-label="Footer">');
  });

  it('should resolve its assets two levels up', async () => {
    expect(await renderPage(Page)).toContain('href="../../assets/styles.css"');
  });
});

describe.each(patternPages)('%s page', (_name, Page) => {
  it('should link back to the overview', async () => {
    expect(await renderPage(Page)).toContain('href="../../">Back to the overview');
  });

  it('should resolve its assets two levels up', async () => {
    expect(await renderPage(Page)).toContain('href="../../assets/styles.css"');
  });
});

describe('landing page', () => {
  it('should extend the shared navigation with an in-page anchor', async () => {
    const html = await renderPage(LandingPage);

    expect(html).toContain('href="#features"');
    expect(html).toContain('id="features"');
    expect(countOccurrences(html, 'aria-current="page"')).toBe(1);
  });
});

describe('contact page', () => {
  it('should wire the form controls to their labels and hints', async () => {
    const html = await renderPage(ContactPage);

    expect(html).toContain('for="name"');
    expect(html).toContain('aria-describedby="name-hint"');
    expect(html).toContain('id="name-hint"');
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
  });

  it('should load its behaviour from a deferred script', async () => {
    expect(await renderPage(ContactPage)).toContain('<script src="main.js" defer></script>');
  });
});

describe('header patterns', () => {
  it('should render the single-row variant without search on header-1', async () => {
    const html = await renderPage(Header1Page);

    expect(html).not.toContain('role="search"');
    expect(html).not.toContain('border-t border-line px-6 py-3');
  });

  it('should render the stacked variant with search on header-2', async () => {
    const html = await renderPage(Header2Page);

    expect(html).toContain('role="search"');
    expect(html).toContain('border-t border-line px-6 py-3');
  });
});
