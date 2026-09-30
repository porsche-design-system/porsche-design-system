import { classes } from '../../_classes.ts';
import type { MetaActionItem } from '../../_data.ts';

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
export const MetaActions = ({ items, scheme }: MetaActionsProps) => (
  <>
    {items.map((item) =>
      item.href ? (
        <p-link-pure
          key={item.id}
          class={classes('p-static-xs -m-static-xs', scheme)}
          href={item.href}
          icon={item.icon}
          hide-label="true"
        >
          {item.label}
        </p-link-pure>
      ) : (
        <p-button-pure
          key={item.id}
          class={classes('p-static-xs -m-static-xs', scheme)}
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
