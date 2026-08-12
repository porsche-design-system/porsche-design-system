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

export const navItems: NavItem[] = [
  { id: 'landing', href: 'landing-page/', label: 'Landing page' },
  { id: 'contact', href: 'contact-page/', label: 'Contact page' },
];

export const footerNavItems: FooterNavItem[] = [
  { href: 'landing-page/#legal-notice', label: 'Legal notice' },
  { href: 'landing-page/#privacy-policy', label: 'Privacy policy' },
  { href: 'contact-page/', label: 'Contact us' },
];
