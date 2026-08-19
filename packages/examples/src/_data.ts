/**
 * Shared data available to every page, so lists like the main navigation are defined exactly once.
 *
 * The twins keep this in `_data.json` and merge it into the template scope. Here it is a module: pages import what
 * they need and pass it on explicitly, which is why a typo in a key is a compile error rather than a render-time one.
 *
 * Two kinds of links live here, and only one of them is real:
 * - `templateItems` / `patternItems` are the examples themselves, linked from the overview pages, so their `href` is a
 *   real relative URL – relative to the root of their category.
 * - `navItems` / `metaActionItems` / `categoryItems` are the chrome of a demo. They exist to show a
 *   navigation, not to navigate, so they point at `#` and are never kept in sync with the file tree.
 */

import type { JSX } from 'preact';

/** A link that carries no id, because nothing ever marks it as the current page. */
export type LinkItem = {
  /** `placeholderHref` for the demo chrome; only the example lists below carry real URLs. */
  href: string;
  label: string;
};

export type NavItem = LinkItem & {
  /** Matches the `currentPage` of a page, which is how the active item gets `aria-current="page"`. */
  id: string;
  /**
   * Sub navigation of this entry. An entry with `children` becomes a level of the drilldown to descend into, one
   * without stays a link – which is how the same list renders one, two or three levels without a second data shape.
   */
  children?: NavItem[];
};

/**
 * Icon names accepted by the PDS components, derived from the JSX typings instead of importing the icon list, so
 * `_data.ts` keeps `@porsche-design-system` out of its imports and a typo is still a compile error.
 */
type IconName = NonNullable<JSX.IntrinsicElements['p-icon']['name']>;

/** A compact icon-only affordance of the header – search, favorites, cart, user. */
export type MetaActionItem = {
  /** Referenced by the header variants to pick which affordances they show. */
  id: string;
  /** Always rendered as text: the icon buttons only hide it visually, so this is the accessible name. */
  label: string;
  icon: IconName;
  /** Set for a link (`p-link-pure`), omitted for an action a page would handle itself (`p-button-pure`). */
  href?: string;
};

/**
 * The href of every link that exists to be seen rather than followed.
 *
 * It is a constant, not a literal in the markup, for two reasons: it names the intent at each call site, and Biome's
 * `a11y/useValidAnchor` rule rejects a literal `"#"` – rightly so in an application, where such a link is usually a
 * button in disguise. Here the links are the demonstration.
 */
export const placeholderHref = '#';

/** An entry of one of the two categories, listed on the overview pages. */
export type ExampleItem = NavItem & {
  /** One sentence, shown next to the link on the overview page. */
  description: string;
};

/**
 * Templates are complete application pages: they own the chrome and demonstrate a full document.
 *
 * The `href` is relative to the root of the generated `templates` project, so the overview of that project links it
 * directly and the overview of the source tree prefixes it with the category.
 */
export const templateItems: ExampleItem[] = [
  {
    id: 'landing',
    href: 'landing-page/',
    label: 'Landing page',
    description: 'Hero, feature grid and call to action, with a page level navigation override.',
  },
];

/** Patterns showcase a single section of a page, so variations of the same partial can be compared. */
export const patternItems: ExampleItem[] = [
  {
    id: 'header-overlay',
    href: 'header/overlay/',
    label: 'Header - Overlay',
    description: 'Brand, navigation and meta actions on a single row, lying on top of the content.',
  },
  {
    id: 'header-stacked',
    href: 'header/stacked/',
    label: 'Header - Stacked',
    description: 'Note, header bar and category navigation stacked above the content.',
  },
  {
    id: 'footer',
    href: 'footer/',
    label: 'Footer',
    description: 'Footer with a logo, navigation and legal links, shown at the bottom of a page.',
  },
];

/**
 * Placeholder navigation of the demo chrome – enough to show the pattern, deliberately going nowhere.
 *
 * The nesting is the point: `Home` has two levels below it, `Features` one, `Contact` none. The header renders all
 * three from this one list, so a variant cannot silently show a different navigation than its sibling.
 */
export const navItems: NavItem[] = [
  {
    id: 'home',
    href: placeholderHref,
    label: 'Home',
    children: [
      { id: 'home-highlights', href: placeholderHref, label: 'Highlights' },
      {
        id: 'home-models',
        href: placeholderHref,
        label: 'Models',
        children: [
          { id: 'home-models-911', href: placeholderHref, label: '911' },
          { id: 'home-models-taycan', href: placeholderHref, label: 'Taycan' },
        ],
      },
    ],
  },
  {
    id: 'features',
    href: placeholderHref,
    label: 'Features',
    children: [
      { id: 'features-design', href: placeholderHref, label: 'Design' },
      { id: 'features-technology', href: placeholderHref, label: 'Technology' },
    ],
  },
  { id: 'contact', href: placeholderHref, label: 'Contact' },
];

/**
 * The icon affordances of the header, in the order they appear. Each variant picks the subset it shows, which is
 * why they are one list here instead of markup repeated per variant.
 */
export const metaActionItems: MetaActionItem[] = [
  { id: 'search', label: 'Search', icon: 'search' },
  { id: 'favorites', label: 'Favorites', icon: 'heart', href: placeholderHref },
  { id: 'cart', label: 'Shopping Cart', icon: 'shopping-cart', href: placeholderHref },
  { id: 'user', label: 'User', icon: 'user' },
];

/** Note above the header bar of the `stacked` variant – shop chrome, shown to demonstrate the extra row. */
export const noticeText = 'All sizes shown for Porsche Lifestyle products are EU sizes';

/** Secondary navigation below the header bar of the `stacked` variant. */
export const categoryItems: LinkItem[] = [
  { href: placeholderHref, label: 'All categories' },
  { href: placeholderHref, label: 'Timepieces' },
  { href: placeholderHref, label: 'Bags & Luggage' },
  { href: placeholderHref, label: 'Heritage' },
  { href: placeholderHref, label: 'Vehicle Accessories' },
  { href: placeholderHref, label: 'Eyewear' },
];
