import fs from 'node:fs';
import path from 'node:path';
import { render } from 'preact-render-to-string';
import { describe, expect, it } from 'vitest';
import { extractScripts } from '../../../lib/entries.ts';
import { normalizeClassAttributes, renderPage } from '../../../lib/jsx.ts';
import { scriptEntryName } from '../../../lib/projects.ts';
import { PatternPage } from '../../../src/_layouts/PatternPage.tsx';
import { TemplatePage } from '../../../src/_layouts/TemplatePage.tsx';
import { Footer } from '../../../src/_partials/footer/Footer.tsx';
import { Head } from '../../../src/_partials/Head.tsx';
import { categoryItems } from '../../../src/_partials/header/CategoryTabs.tsx';
import { Header } from '../../../src/_partials/header/Header.tsx';
import { navItems } from '../../../src/_partials/header/MainNav.tsx';
import { noticeText } from '../../../src/_partials/header/NoticeBar.tsx';
import FeedbackDialogPage from '../../../src/patterns/feedback/dialog/index.page.tsx';
import FeedbackInlinePage from '../../../src/patterns/feedback/inline/index.page.tsx';
import FooterPatternPage from '../../../src/patterns/footer/index.page.tsx';
import HeaderOverlayPage from '../../../src/patterns/header/overlay/index.page.tsx';
import HeaderStackedPage from '../../../src/patterns/header/stacked/index.page.tsx';
import PopoverFeatureTourPage from '../../../src/patterns/popover/feature-tour/index.page.tsx';
import PopoverLocalMarketSwitchPage from '../../../src/patterns/popover/local-market-switch/index.page.tsx';
import PopoverPriorityNavigationPage from '../../../src/patterns/popover/priority-navigation/index.page.tsx';
import AdminPanelPage from '../../../src/templates/admin-panel/index.page.tsx';
import LandingPage from '../../../src/templates/landing-page/index.page.tsx';
import {
  countFirstLevelHeadings,
  countOccurrences,
  examplePages,
  flattenNavItems,
  getOpeningTag,
  patternPages,
} from '../helpers/index.ts';

/**
 * The static composition of the pages – data, partials, layouts and the pages themselves – asserted on the rendered
 * markup, before a browser is involved.
 *
 * What axe checks on the composed page is not repeated here: one `main` landmark, no duplicated banner or contentinfo,
 * and at least one first level heading are the a11y suite's (see `tests/a11y/`). What axe cannot see stays – a lone
 * unlabelled navigation, which order the landmarks come in, where links point, which ids a page's script hooks on.
 */

describe('data', () => {
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

describe('source files', () => {
  const srcDir = path.join(import.meta.dirname, '../../../src');
  const sources = (fs.readdirSync(srcDir, { recursive: true }) as string[])
    .filter((file) => file.endsWith('.tsx'))
    .map((file) => [file, fs.readFileSync(path.join(srcDir, file), 'utf8') as string] as const);

  it.each(sources)('should only look up ids "%s" renders itself', (_file, source) => {
    // A script sits in the component whose markup it wires up, so the two are read and renamed together. An id
    // rendered by another file would couple them invisibly – a page reaching into a partial, say – which a prop or a
    // relation such as `closest()` expresses instead.
    const rendered = new Set(Array.from(source.matchAll(/\sid="([^"]+)"/g), ([, id]) => id));
    const queried = [
      ...Array.from(source.matchAll(/getElementById\('([^']+)'\)/g), ([, id]) => id),
      ...Array.from(source.matchAll(/querySelector(?:All)?\('#([\w-]+)/g), ([, id]) => id),
    ];

    expect(queried.filter((id) => !rendered.has(id))).toEqual([]);
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

  // A `robots.txt` cannot replace this: it is only read at the origin root, and the projects are served from a path.
  it('should keep the demos out of search results', () => {
    expect(html).toContain('<meta name="robots" content="noindex"');
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
      expect(url).toBe('#');
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

  it('should fall back to the shared navigation', () => {
    expect(countOccurrences(render(<Header currentPage="home" />), '<p-drilldown-link')).toBe(
      flattenNavItems(navItems).length
    );
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
    // Normalized like `renderPage()` does, since the unset scheme leaves a trailing space in the template literal.
    const html = normalizeClassAttributes(
      render(<Header currentPage="home" navItems={navItems} showSearch variant="stacked" />)
    );

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
      expect(url).toBe('#');
    }
  });
});

describe('TemplatePage', () => {
  const renderTemplatePage = (props: Partial<Parameters<typeof TemplatePage>[0]> = {}) =>
    render(
      <TemplatePage title="Template" description="Description" {...props}>
        <main id="main">
          <h1>Content</h1>
        </main>
      </TemplatePage>
    );

  it('should render the children as the body, and nothing the layout adds around them', () => {
    expect(renderTemplatePage()).toContain('<body><main id="main"><h1>Content</h1></main></body>');
  });

  it('should render no script of its own, leaving the entry to the build', () => {
    const html = renderTemplatePage();

    expect(html).not.toContain('<script');
    expect(html).not.toContain(scriptEntryName);
  });

  it('should leave the chrome to the page', () => {
    const html = renderTemplatePage();

    expect(html).not.toContain('<header');
    expect(html).not.toContain('<footer');
  });

  it('should put the classes it is given on the document element', () => {
    expect(renderTemplatePage({ class: 'scheme-light-dark bg-surface' })).toContain(
      '<html lang="en" class="scheme-light-dark bg-surface">'
    );
    expect(renderTemplatePage()).toContain('<html lang="en">');
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

  it('should render no script of its own, leaving the entry to the build', () => {
    expect(renderPatternPage()).not.toContain('<script');
  });

  it('should not ship the shared chrome, which is what a pattern demonstrates', () => {
    const html = renderPatternPage();

    expect(html).not.toContain('<nav aria-label="Main">');
    expect(html).not.toContain('aria-label="Footer"');
  });
});

describe.each(examplePages)('%s page', (_name, Page) => {
  it('should render at most one first level heading', async () => {
    const html = await renderPage(Page);

    // axe's `page-has-heading-one` asks for at least one, on every page but the footer pattern, which shows nothing
    // but its own section. Together with this, every other page has exactly one.
    expect(countFirstLevelHeadings(html)).toBeLessThanOrEqual(1);
  });

  it('should label every navigation landmark', async () => {
    // axe only flags an unlabelled navigation once a second one appears on the page; a lone one passes it.
    expect(await renderPage(Page)).not.toContain('<nav>');
  });

  it('should keep the behaviour out of the markup, where its script hooks it on ids', async () => {
    // An example ships no framework and no inline handler either: a page renders ids and its script wires them up.
    expect(await renderPage(Page)).not.toMatch(/\son[a-z]+="/);
  });

  it('should link nowhere but to "#" or to an id on the same page', async () => {
    // The examples demonstrate chrome, they are not a website: a link that points somewhere would break in the
    // storefront and in StackBlitz alike. This replaces Biome's `a11y/useValidAnchor`, which is off for the examples
    // because it rejects the placeholder `href="#"` – and covers the `p-link*` elements, which the rule never saw.
    const { html } = extractScripts(await renderPage(Page));
    const ids = new Set(Array.from(html.matchAll(/\sid="([^"]+)"/g), ([, id]) => id));
    const targets = Array.from(html.matchAll(/\s(?:href|action)="([^"]*)"/g), ([, target]) => target);

    expect(targets.filter((target) => target !== '#' && !(target.startsWith('#') && ids.has(target.slice(1))))).toEqual(
      []
    );
    // An anchor without an href is not a link at all – not focusable, not announced as one.
    expect(html.match(/<a\b(?![^>]*\shref=)[^>]*>/g) ?? []).toEqual([]);
  });

  it('should render every id once, since a script would only ever find the first one', async () => {
    // axe-core no longer reports duplicate ids – the rule is deprecated and outside the WCAG tags the a11y suite runs.
    const ids = Array.from(extractScripts(await renderPage(Page)).html.matchAll(/\sid="([^"]+)"/g), ([, id]) => id);

    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });

  it('should leave referencing the entry to the build, which moves every script into it', async () => {
    const html = await renderPage(Page);

    expect(html).not.toContain(scriptEntryName);
    expect(countOccurrences(html, '<script')).toBe(countOccurrences(html, '<script type="module">'));
  });

  it('should not leave any template syntax in the output', async () => {
    const html = await renderPage(Page);

    expect(html).not.toMatch(/\{\{|\}\}|\{%|%\}|<!--\s*@/);
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

  it('should give its video a labelled pause control, which brings its own behaviour', async () => {
    const html = await renderPage(LandingPage);

    expect(html).toContain('id="pause-button"');
    expect(extractScripts(html).scripts.join('\n')).toContain("getElementById('hero-video')");
  });
});

describe('admin panel', () => {
  /** The ids its script looks up. */
  const behaviourHooks = [
    'admin-canvas',
    'search-button',
    'search-dialog',
    'settings-button',
    'sidebar-nav',
    'model-tabs',
    'scheme-select',
  ];

  it('should render each id its own behaviour hooks on exactly once', async () => {
    const html = await renderPage(AdminPanelPage);

    for (const id of behaviourHooks) {
      expect(countOccurrences(html, `id="${id}"`)).toBe(1);
    }
    // Neither the drilldown nor a hero video is part of an application shell, so the page's own script is the only one.
    expect(extractScripts(html).scripts).toHaveLength(1);
  });

  it('should announce what its two affordances open, and keep the dialog outside the shell', async () => {
    const html = await renderPage(AdminPanelPage);

    expect(getOpeningTag(html, 'search-button')).toContain(`aria="{ 'aria-haspopup': 'dialog' }"`);
    // The sidebar is a disclosure, so its trigger ships the state its script keeps in sync.
    expect(getOpeningTag(html, 'settings-button')).toContain(`aria="{ 'aria-expanded': false }"`);
    expect(html.indexOf('<p-canvas')).toBeLessThan(html.indexOf('<p-modal'));
  });

  it('should name every repeated control, so the rows are told apart out of context', async () => {
    const html = await renderPage(AdminPanelPage);

    expect(html).toContain('Edit 718 Cayman');
    expect(html).toContain('Delete 911 Carrera');
    expect(countOccurrences(html, 'name="some-name"')).toBe(0);
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

  it('should carry the behaviour of the header and of the video, rendered by their partials', async () => {
    expect(extractScripts(await renderPage(HeaderOverlayPage)).scripts).toHaveLength(2);
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
    expect(html).toContain('id="nav-drilldown"');
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

  it('should carry the behaviour of the header, the video and the local market switch itself', async () => {
    expect(extractScripts(await renderPage(PopoverLocalMarketSwitchPage)).scripts).toHaveLength(3);
  });

  it('should collapse the priority navigation into a trigger that is not shown while nothing overflows', async () => {
    const html = await renderPage(PopoverPriorityNavigationPage);

    expect(html).toContain('<li id="more-trigger" class="ms-auto" hidden>');
    expect(html).toContain(`aria="{ 'aria-expanded': false }"`);
    // The entries live in the bar; the popover starts empty because its script moves the very same elements into it.
    expect(html).toContain('<ul id="overflow-list"');
    expect(countOccurrences(html, 'Some Item')).toBe(9);
  });

  it('should walk the feature tour through one coachmark per affordance, the first one open', async () => {
    // The markup only – the script of the page selects the steps by the very attribute counted here.
    const { html } = extractScripts(await renderPage(PopoverFeatureTourPage));
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
  ])('should keep the %s on its own behaviour, with no partial bringing any', async (_name, Page) => {
    expect(extractScripts(await renderPage(Page)).scripts).toHaveLength(1);
  });
});

describe('feedback patterns', () => {
  const feedbackPages = [
    ['inline', FeedbackInlinePage],
    ['dialog', FeedbackDialogPage],
  ] as const;

  it.each(feedbackPages)('should ask the very same flow in the %s variant, rendered once', async (_name, Page) => {
    const html = await renderPage(Page);

    // One source for both variants (`_FeedbackForm.tsx`): the question, the five step scale, the optional comment
    // and the confirmation – so the two cannot drift apart.
    expect(html).toContain('How satisfied are you with the information shown on this page?');
    expect(countOccurrences(html, '<p-segmented-control-item')).toBe(5);
    expect(countOccurrences(html, 'id="feedback-rating"')).toBe(1);
    expect(countOccurrences(html, 'id="feedback-comment"')).toBe(1);
    expect(countOccurrences(html, 'id="feedback-thanks"')).toBe(1);
  });

  it.each(feedbackPages)('should hide everything the rating reveals in the %s variant', async (_name, Page) => {
    const html = await renderPage(Page);

    // Comment, submit and confirmation are revealed by its script; the page ships the state the flow starts in.
    for (const id of ['feedback-comment', 'feedback-submit', 'feedback-thanks']) {
      expect(getOpeningTag(html, id)).toContain('hidden');
    }
    // The confirmation is announced even where focus cannot be moved.
    expect(countOccurrences(html, 'aria-live="polite"')).toBe(1);
  });

  it('should keep the flow and its behaviour in the partial, adding only what the variant renders itself', async () => {
    const [inline, dialog] = await Promise.all(
      feedbackPages.map(async ([, Page]) => extractScripts(await renderPage(Page)).scripts)
    );

    // The inline variant renders nothing interactive of its own; the dialog variant opens and closes its modal.
    expect(inline).toHaveLength(1);
    expect(dialog).toHaveLength(2);
    expect(dialog.filter((script) => script.includes("getElementById('feedback-rating')"))).toHaveLength(1);
  });

  it('should show the inline variant in the page, offering to start over', async () => {
    const html = await renderPage(FeedbackInlinePage);

    expect(html).not.toContain('<p-modal');
    expect(html).toContain('id="feedback-restart"');
    expect(html).toContain('aria-label="Feedback"');
  });

  it('should ask the dialog variant for permission and keep the flow in a modal below the content', async () => {
    const html = await renderPage(FeedbackDialogPage);

    expect(html).toContain(`aria="{ 'aria-haspopup': 'dialog' }"`);
    expect(html).toContain('id="feedback-trigger"');
    expect(html).toContain(`<p-modal id="feedback-modal" aria="{ 'aria-label': 'Feedback' }">`);
    expect(html).toContain('id="feedback-close"');
    // Like every dialog, it is the last element of the body rather than part of the content it belongs to.
    expect(html.indexOf('<main')).toBeLessThan(html.indexOf('<p-modal'));
  });
});
