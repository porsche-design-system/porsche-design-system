import { classes } from '../../_classes.ts';
import type { NavItem } from '../../_data.ts';

type NavEntriesProps = {
  /** Id of the active `NavItem`; only that one gets `aria-current="page"`. */
  currentPage: string;
  /** Placeholder links – the header demonstrates a navigation, it does not provide one. */
  navItems: NavItem[];
};

type MainNavProps = NavEntriesProps & {
  /** Color scheme class of the bar. It reaches the menu button only – see below. */
  scheme?: string;
};

type DrilldownLinkProps = {
  currentPage: string;
  item: NavItem;
  /** Overrides the label of the entry, used for the entry pointing at a level's own page. */
  label?: string;
};

/**
 * One leaf of the navigation.
 *
 * The anchor is slotted rather than passed as `href`, because `p-drilldown-link` renders `aria-current="true"` for
 * its own anchor while a navigation wants `aria-current="page"`. `active` is kept alongside it: it is what marks the
 * entry visually.
 */
const DrilldownLink = ({ currentPage, item, label = item.label }: DrilldownLinkProps) => {
  const isCurrent = item.id === currentPage;

  return (
    <p-drilldown-link active={isCurrent}>
      <a href={item.href} aria-current={isCurrent ? 'page' : undefined}>
        {label}
      </a>
    </p-drilldown-link>
  );
};

/**
 * Renders a `NavItem` list into drilldown entries, one level per nesting level.
 *
 * An item with `children` becomes a `p-drilldown-item` – a level to descend into, which is not a link itself, so it
 * gets a leading entry pointing at its own page. An item without `children` stays a link. Both are valid children of
 * `p-drilldown` and of `p-drilldown-item`, which is why one recursive component covers every depth.
 */
const DrilldownEntries = ({ currentPage, navItems }: NavEntriesProps) => (
  <>
    {navItems.map((item) =>
      item.children ? (
        <p-drilldown-item key={item.id} identifier={item.id} label={item.label}>
          <DrilldownLink currentPage={currentPage} item={item} label={`${item.label} overview`} />
          <DrilldownEntries currentPage={currentPage} navItems={item.children} />
        </p-drilldown-item>
      ) : (
        <DrilldownLink key={item.id} currentPage={currentPage} item={item} />
      )
    )}
  </>
);

/**
 * Main navigation of every header variant: a menu button opening a `p-drilldown`.
 *
 * The behaviour is written once in `assets/header.js`, hooked on the two ids – nothing here is hydrated. The build
 * inlines it into the `main.js` of every page rendering this component, which is both variants.
 *
 * `scheme` reaches the button only. The drilldown is a dialog on top of the page, not part of the bar, so it keeps
 * the color scheme of the page – a header lying on a dark hero must not drag that scheme into an overlay.
 */
export const MainNav = ({ currentPage, navItems, scheme }: MainNavProps) => (
  <nav aria-label="Main">
    <p-button-pure
      id="nav-button"
      class={classes('p-static-xs -m-static-xs', scheme)}
      type="button"
      icon="menu-lines"
      hide-label="{ base: true, s: false }"
      aria="{ 'aria-haspopup': 'dialog' }"
    >
      Menu
    </p-button-pure>
    <p-drilldown id="nav-drilldown">
      <DrilldownEntries currentPage={currentPage} navItems={navItems} />
    </p-drilldown>
  </nav>
);
