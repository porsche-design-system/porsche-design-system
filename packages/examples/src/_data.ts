/**
 * Shared data available to every page, so lists like the main navigation are defined exactly once.
 *
 * The twins keep this in `_data.json` and merge it into the template scope. Here it is a module: pages import what
 * they need and pass it on explicitly, which is why a typo in a key is a compile error rather than a render-time one.
 *
 * Two kinds of links live here, and only one of them is real:
 * - `templateItems` / `patternItems` are the examples themselves, linked from the overview page, so their `href` is a
 *   real relative URL.
 * - `navItems` / `footerNavItems` are the chrome of a demo. They exist to show a navigation, not to navigate, so they
 *   point at `#` and are never kept in sync with the file tree.
 */

export type NavItem = {
  /** Matches the `currentPage` of a page, which is how the active item gets `aria-current="page"`. */
  id: string;
  /** `placeholderHref` for the demo chrome; only the example lists below carry real URLs. */
  href: string;
  label: string;
};

/**
 * The href of every link that exists to be seen rather than followed.
 *
 * It is a constant, not a literal in the markup, for two reasons: it names the intent at each call site, and Biome's
 * `a11y/useValidAnchor` rule rejects a literal `"#"` – rightly so in an application, where such a link is usually a
 * button in disguise. Here the links are the demonstration.
 */
export const placeholderHref = '#';

export type FooterNavItem = Omit<NavItem, 'id'>;

/** An entry of one of the two categories, listed on the overview page. */
export type ExampleItem = NavItem & {
  /** One sentence, shown next to the link on the overview page. */
  description: string;
};

/** Templates are complete application pages: they own the chrome and demonstrate a full document. */
export const templateItems: ExampleItem[] = [
  {
    id: 'landing',
    href: 'templates/landing-page/',
    label: 'Landing page',
    description: 'Hero, feature grid and call to action, with a page level navigation override.',
  },
  {
    id: 'contact',
    href: 'templates/contact-page/',
    label: 'Contact page',
    description: 'Form controls wired to labels and hints, plus a live region for the submit status.',
  },
];

/** Patterns showcase a single section of a page, so variations of the same partial can be compared. */
export const patternItems: ExampleItem[] = [
  {
    id: 'header-1',
    href: 'patterns/header-1/',
    label: 'Header 1',
    description: 'Brand, navigation and search on a single row – the default header layout.',
  },
  {
    id: 'header-2',
    href: 'patterns/header-2/',
    label: 'Header 2',
    description: 'Brand and search on top, navigation on its own row below – the stacked header layout.',
  },
];

/** Placeholder navigation of the demo chrome – enough to show the pattern, deliberately going nowhere. */
export const navItems: NavItem[] = [
  { id: 'home', href: placeholderHref, label: 'Home' },
  { id: 'features', href: placeholderHref, label: 'Features' },
  { id: 'contact', href: placeholderHref, label: 'Contact' },
];

export const footerNavItems: FooterNavItem[] = [
  { href: placeholderHref, label: 'Legal notice' },
  { href: placeholderHref, label: 'Privacy policy' },
  { href: placeholderHref, label: 'Contact us' },
];
