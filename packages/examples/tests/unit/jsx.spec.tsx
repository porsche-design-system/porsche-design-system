import { render } from 'preact-render-to-string';
import { describe, expect, it } from 'vitest';
import { doctype, isBuildInput, renderPage, resolvePagePath } from '../../plugins/jsx.ts';
import {
  categoryItems,
  footerNavItems,
  type NavItem,
  navItems,
  noticeText,
  patternItems,
  placeholderHref,
  templateItems,
} from '../../src/_data.ts';
import { BasePage } from '../../src/_layouts/BasePage.tsx';
import { PatternPage } from '../../src/_layouts/PatternPage.tsx';
import { ExampleList } from '../../src/_partials/ExampleList.tsx';
import { Footer } from '../../src/_partials/Footer.tsx';
import { Head } from '../../src/_partials/Head.tsx';
import { Header } from '../../src/_partials/header/Header.tsx';
import { SkipLink } from '../../src/_partials/SkipLink.tsx';
import IndexPage from '../../src/index.page.tsx';
import Header1Page from '../../src/patterns/header-1/index.page.tsx';
import Header2Page from '../../src/patterns/header-2/index.page.tsx';
import ContactPage from '../../src/templates/contact-page/index.page.tsx';
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
    for (const item of [...flattenNavItems(navItems), ...footerNavItems, ...categoryItems]) {
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

  it('should leave the skip link to the page shell', () => {
    expect(render(<Header currentPage="home" navItems={navItems} />)).not.toContain('Skip to content');
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

  it('should load the script of the drilldown navigation without the page having to ask for it', () => {
    expect(renderBasePage()).toContain('<script src="../../assets/header.js" defer></script>');
  });

  it('should load that script for every header variant, since all of them are a drilldown', () => {
    expect(renderBasePage({ headerVariant: 'stacked' })).toContain('<script src="../../assets/header.js" defer>');
  });

  it('should render the deferred page script when given', () => {
    expect(renderBasePage({ pageScript: 'main.js' })).toContain('<script src="main.js" defer></script>');
  });

  it('should render every page script when given a list', () => {
    const html = renderBasePage({ pageScript: ['../../assets/analytics.js', 'main.js'] });

    expect(html).toContain('<script src="../../assets/analytics.js" defer></script>');
    expect(html).toContain('<script src="main.js" defer></script>');
  });

  it('should fall back to the shared navigation', () => {
    const html = renderBasePage();

    expect(countOccurrences(html, '<p-drilldown-link')).toBe(flattenNavItems(navItems).length);
    expect(countOccurrences(html, '<li>')).toBe(footerNavItems.length);
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
      <PatternPage basePath="../../" title="Pattern" description="Description" {...props}>
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

  it('should render the skip link, leaving the main landmark to the page', () => {
    const html = renderPatternPage();

    expect(html).toContain('Skip to content');
    expect(html).toContain('href="#main"');
    expect(html).toContain('<main id="main">');
  });

  it('should render the page content and link back to the overview', () => {
    const html = renderPatternPage();

    expect(html).toContain('<p>Notes</p>');
    expect(html).toContain('href="../../">Back to the overview');
  });

  it('should omit the page script by default', () => {
    expect(renderPatternPage()).not.toContain('<script');
  });

  it('should render the deferred page script when given', () => {
    expect(renderPatternPage({ pageScript: 'main.js' })).toContain('<script src="main.js" defer></script>');
  });

  it('should render every page script when given a list', () => {
    const html = renderPatternPage({ pageScript: ['../../assets/header.js', 'main.js'] });

    expect(html).toContain('<script src="../../assets/header.js" defer></script>');
    expect(html).toContain('<script src="main.js" defer></script>');
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
    expect(countFirstLevelHeadings(html)).toBe(1);
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
  it('should render the overlay variant on header-1', async () => {
    const html = await renderPage(Header1Page);

    expect(html).toContain('<p-drilldown id="nav-drilldown">');
    expect(html).toContain('icon="search"');
    expect(html).not.toContain('aria-label="Categories"');
    expect(html).not.toContain(noticeText);
  });

  it('should load the shared header script and its own behaviour, both deferred', async () => {
    const html = await renderPage(Header1Page);

    expect(html).toContain('<script src="../../assets/header.js" defer></script>');
    expect(html).toContain('<script src="main.js" defer></script>');
  });

  it('should give the video of header-1 a labelled pause control', async () => {
    const html = await renderPage(Header1Page);

    expect(html).toContain('id="pause-button"');
    expect(html).toContain('Pause Video');
  });

  it('should render the stacked variant with its extra rows on header-2', async () => {
    const html = await renderPage(Header2Page);

    expect(html).toContain(noticeText);
    expect(html).toContain('aria-label="Categories"');
  });

  it('should share the very same navigation between both patterns', async () => {
    const [html1, html2] = await Promise.all([renderPage(Header1Page), renderPage(Header2Page)]);

    for (const html of [html1, html2]) {
      expect(countOccurrences(html, '<p-drilldown-item')).toBe(
        flattenNavItems(navItems).filter((item) => item.children).length
      );
      expect(html).toContain('<nav aria-label="Main">');
    }
  });
});
