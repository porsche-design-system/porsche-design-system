/**
 * Shared data available to every page, so lists like the main navigation are defined exactly once.
 *
 * The twins keep this in `_data.json` and merge it into the template scope. Here it is a module: pages import what
 * they need and pass it on explicitly, which is why a typo in a key is a compile error rather than a render-time one.
 */

export type NavItem = {
  /** Matches the `currentPage` of a page, which is how the active item gets `aria-current="page"`. */
  id: string;
  /** Relative to the site root – pages prepend their own `basePath`. */
  href: string;
  label: string;
};

export type FooterNavItem = Omit<NavItem, 'id'>;

/** An entry of one of the two categories, listed on the overview pages. */
export type ExampleItem = NavItem & {
  /** One sentence, shown next to the link on the overview pages. */
  description: string;
};

/** Templates are complete application pages: they own the chrome and demonstrate a full document. */
export const templateItems: ExampleItem[] = [
  {
    id: 'landing',
    href: 'templates/landing-page/',
    label: 'Landing page',
    description: 'Hero, feature grid and legal sections, with a page level navigation override.',
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

/** The main navigation lists the templates only, so the header stays short as patterns are added. */
export const navItems: NavItem[] = templateItems.map(({ id, href, label }) => ({ id, href, label }));

export const footerNavItems: FooterNavItem[] = [
  { href: 'templates/landing-page/#legal-notice', label: 'Legal notice' },
  { href: 'templates/landing-page/#privacy-policy', label: 'Privacy policy' },
  { href: 'templates/contact-page/', label: 'Contact us' },
];
