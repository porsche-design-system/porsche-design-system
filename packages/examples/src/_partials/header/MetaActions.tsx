import type { JSX } from 'preact';

/**
 * Icon names accepted by the PDS components, derived from the JSX typings instead of importing the icon list, so a typo
 * is still a compile error.
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
 * The icon affordances of the header, in the order they appear. Each variant picks the subset it shows, which is
 * why they are one list here instead of markup repeated per variant.
 */
export const metaActionItems: MetaActionItem[] = [
  { id: 'search', label: 'Search', icon: 'search' },
  { id: 'favorites', label: 'Favorites', icon: 'heart', href: '#' },
  { id: 'cart', label: 'Shopping Cart', icon: 'shopping-cart', href: '#' },
  { id: 'user', label: 'User', icon: 'user' },
];

type MetaActionsProps = {
  /** Already narrowed to what the variant shows – see `Header`. */
  items: MetaActionItem[];
  /** Color scheme class of the bar, since the affordances sit on it – see `Header`. */
  scheme?: string;
};

/**
 * The icon affordances of the header, rendered from data instead of once per variant.
 *
 * An item with an `href` is a link, one without is a button: the same distinction a real header makes between "go
 * to the cart" and "open the search". `hide-label` only hides the label visually, so every affordance keeps its
 * accessible name without an `aria-label` duplicating it.
 */
export const MetaActions = ({ items, scheme = '' }: MetaActionsProps) => (
  <>
    {items.map((item) =>
      item.href ? (
        <p-link-pure
          key={item.id}
          class={`p-static-xs -m-static-xs ${scheme}`}
          href={item.href}
          icon={item.icon}
          hide-label="true"
        >
          {item.label}
        </p-link-pure>
      ) : (
        <p-button-pure
          key={item.id}
          class={`p-static-xs -m-static-xs ${scheme}`}
          type="button"
          icon={item.icon}
          hide-label="true"
        >
          {item.label}
        </p-button-pure>
      )
    )}
  </>
);
