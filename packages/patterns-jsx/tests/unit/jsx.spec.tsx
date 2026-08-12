import { render } from 'preact-render-to-string';
import { describe, expect, it } from 'vitest';
import { doctype, isTemplateInput, renderPage, resolvePagePath } from '../../plugins/jsx.ts';
import { footerNavItems, navItems } from '../../src/_data.ts';
import { BasePage } from '../../src/_layouts/BasePage.tsx';
import { Footer } from '../../src/_partials/Footer.tsx';
import { Head } from '../../src/_partials/Head.tsx';
import { Header } from '../../src/_partials/Header.tsx';
import ContactPage from '../../src/contact-page/index.page.tsx';
import IndexPage from '../../src/index.page.tsx';
import LandingPage from '../../src/landing-page/index.page.tsx';

const countOccurrences = (haystack: string, needle: string): number => haystack.split(needle).length - 1;

describe('resolvePagePath()', () => {
  it('should map the root URL to the index page', () => {
    expect(resolvePagePath('/')).toBe('index.page.tsx');
  });

  it('should map a directory URL to its index page', () => {
    expect(resolvePagePath('/landing-page/')).toBe('landing-page/index.page.tsx');
  });

  it('should map an explicit .html URL to its page', () => {
    expect(resolvePagePath('/contact-page/index.html')).toBe('contact-page/index.page.tsx');
  });

  it('should ignore query strings and hashes', () => {
    expect(resolvePagePath('/landing-page/?foo=bar#features')).toBe('landing-page/index.page.tsx');
  });

  it('should decode escaped characters', () => {
    expect(resolvePagePath('/landing%20page/')).toBe('landing page/index.page.tsx');
  });

  it.each(['/assets/patterns.css', '/contact-page/main.js', '/@vite/client'])(
    'should return undefined for the asset request "%s"',
    (url) => {
      expect(resolvePagePath(url)).toBeUndefined();
    }
  );
});

describe('isTemplateInput()', () => {
  it.each(['src/_data.ts', 'src/_layouts/BasePage.tsx', 'src/_partials/Head.tsx'])(
    'should detect "%s" as an input',
    (relativePath) => {
      expect(isTemplateInput('src', `src/${relativePath.replace('src/', '')}`)).toBe(true);
    }
  );

  it.each(['src/index.page.tsx', 'src/landing-page/index.page.tsx', 'src/assets/patterns.css'])(
    'should not detect "%s" as an input',
    (filePath) => {
      expect(isTemplateInput('src', filePath)).toBe(false);
    }
  );
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
        currentPage="overview"
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
  const html = render(<Head basePath="../" title="Contact page" description="A description." />);

  it('should suffix the document title', () => {
    expect(html).toContain('<title>Contact page | Dummy Patterns</title>');
  });

  it('should render the description meta tag', () => {
    expect(html).toContain('<meta name="description" content="A description."');
  });

  it('should resolve the stylesheet against the base path', () => {
    expect(html).toContain('href="../assets/patterns.css"');
  });
});

describe('Header', () => {
  it('should mark only the current page with aria-current', () => {
    const html = render(<Header basePath="../" currentPage="contact" navItems={navItems} />);

    expect(countOccurrences(html, 'aria-current="page"')).toBe(1);
    expect(html).toContain('href="../contact-page/" aria-current="page"');
  });

  it('should mark no item when the current page is not part of the navigation', () => {
    const html = render(<Header basePath="./" currentPage="overview" navItems={navItems} />);

    expect(html).not.toContain('aria-current');
  });

  it('should render one link per navigation item', () => {
    const html = render(<Header basePath="./" currentPage="overview" navItems={navItems} />);

    for (const item of navItems) {
      expect(html).toContain(`href="./${item.href}"`);
      expect(html).toContain(item.label);
    }
  });

  it('should hide the search form by default', () => {
    const html = render(<Header basePath="./" currentPage="overview" navItems={navItems} />);

    expect(html).not.toContain('role="search"');
  });

  it('should render the labelled search form when requested', () => {
    const html = render(<Header basePath="./" currentPage="overview" navItems={navItems} showSearch />);

    expect(html).toContain('role="search"');
    expect(html).toContain('<label class="sr-only" for="site-search">');
    expect(html).toContain('id="site-search"');
  });

  it('should render a skip link and a labelled navigation landmark', () => {
    const html = render(<Header basePath="./" currentPage="overview" navItems={navItems} />);

    expect(html).toContain('href="#main"');
    expect(html).toContain('Skip to content');
    expect(html).toContain('<nav aria-label="Main">');
  });
});

describe('Footer', () => {
  const html = render(<Footer basePath="../" footerNavItems={footerNavItems} />);

  it('should render a labelled navigation landmark', () => {
    expect(html).toContain('<nav aria-label="Footer">');
  });

  it('should resolve every link against the base path', () => {
    for (const item of footerNavItems) {
      expect(html).toContain(`href="../${item.href}"`);
    }
  });
});

describe('BasePage', () => {
  const renderBasePage = (props: Partial<Parameters<typeof BasePage>[0]> = {}) =>
    render(
      <BasePage basePath="./" title="Title" description="Description" currentPage="overview" {...props}>
        <h1>Content</h1>
      </BasePage>
    );

  it('should render the landmarks in document order', () => {
    const html = renderBasePage();

    expect(html.indexOf('<header')).toBeLessThan(html.indexOf('<main'));
    expect(html.indexOf('<main')).toBeLessThan(html.indexOf('<footer'));
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
    const html = renderBasePage();

    expect(countOccurrences(html, '<li>')).toBe(navItems.length + footerNavItems.length);
  });

  it('should let a page override the shared navigation', () => {
    const pageNavItems = [{ id: 'only', href: 'only/', label: 'Only item' }];
    const html = renderBasePage({ navItems: pageNavItems });

    expect(html).toContain('Only item');
    expect(html).not.toContain('Landing page');
  });
});

describe.each([
  ['index', IndexPage],
  ['landing-page', LandingPage],
  ['contact-page', ContactPage],
])('%s page', (_name, Page) => {
  it('should render exactly one of each landmark', async () => {
    const html = await renderPage(Page);

    expect(countOccurrences(html, '<header')).toBe(1);
    expect(countOccurrences(html, '<main')).toBe(1);
    expect(countOccurrences(html, '<footer')).toBe(1);
    expect(countOccurrences(html, '<h1')).toBe(1);
  });

  it('should ship the accessibility baseline', async () => {
    const html = await renderPage(Page);

    expect(html).toContain('Skip to content');
    expect(html).toContain('id="main"');
    expect(html).toContain('<nav aria-label="Main">');
    expect(html).toContain('<nav aria-label="Footer">');
  });

  it('should not leave any template syntax in the output', async () => {
    const html = await renderPage(Page);

    expect(html).not.toMatch(/\{\{|\}\}|\{%|%\}|<!--\s*@/);
  });
});

describe('landing page', () => {
  it('should extend the shared navigation with its own item', async () => {
    const html = await renderPage(LandingPage);

    expect(html).toContain('href="../landing-page/#features"');
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
