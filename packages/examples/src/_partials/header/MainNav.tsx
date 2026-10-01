import { Script } from '../Script.tsx';

export type NavItem = {
  /** Matches the `currentPage` of a page, which is how the active item gets `aria-current="page"`. */
  id: string;
  /** `#` – the header demonstrates a navigation, it does not provide one – or an id on the same page. */
  href: string;
  label: string;
  /**
   * Sub navigation of this entry. An entry with `children` becomes a level of the drilldown to descend into, one
   * without stays a link – which is how the same list renders one, two or three levels without a second data shape.
   */
  children?: NavItem[];
};

/**
 * Placeholder navigation of the demo chrome – enough to show the pattern, deliberately going nowhere.
 *
 * The nesting is the point: `Home` has two levels below it, `Features` one, `Contact` none. Every header renders it
 * unless a page passes its own – exported, so a page can extend it (`[...navItems, extra]`) instead of replacing it.
 */
export const navItems: NavItem[] = [
  {
    id: 'home',
    href: '#',
    label: 'Home',
    children: [
      { id: 'home-highlights', href: '#', label: 'Highlights' },
      {
        id: 'home-models',
        href: '#',
        label: 'Models',
        children: [
          { id: 'home-models-911', href: '#', label: '911' },
          { id: 'home-models-taycan', href: '#', label: 'Taycan' },
        ],
      },
    ],
  },
  {
    id: 'features',
    href: '#',
    label: 'Features',
    children: [
      { id: 'features-design', href: '#', label: 'Design' },
      { id: 'features-technology', href: '#', label: 'Technology' },
    ],
  },
  { id: 'contact', href: '#', label: 'Contact' },
];

type NavEntriesProps = {
  /** Id of the active `NavItem`; only that one gets `aria-current="page"`. */
  currentPage: string;
  /** Placeholder links – the header demonstrates a navigation, it does not provide one. */
  navItems: NavItem[];
};

type MainNavProps = Omit<NavEntriesProps, 'navItems'> & {
  /** Defaults to the shared `navItems`; a page may replace or extend them. */
  navItems?: NavItem[];
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
const DrilldownEntries = ({ currentPage, navItems: items }: NavEntriesProps) => (
  <>
    {items.map((item) =>
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
 * The behaviour is written once, below the markup it wires up, and hooked on its two ids – nothing here is hydrated.
 * Every page rendering this component therefore carries it, which is both header variants.
 *
 * `scheme` reaches the button only. The drilldown is a dialog on top of the page, not part of the bar, so it keeps
 * the color scheme of the page – a header lying on a dark hero must not drag that scheme into an overlay.
 */
export const MainNav = ({ currentPage, navItems: items = navItems, scheme = '' }: MainNavProps) => (
  <nav aria-label="Main">
    <p-button-pure
      id="nav-button"
      class={`p-static-xs -m-static-xs ${scheme}`}
      type="button"
      icon="menu-lines"
      hide-label="{ base: true, s: false }"
      aria="{ 'aria-haspopup': 'dialog' }"
    >
      Menu
    </p-button-pure>
    <p-drilldown id="nav-drilldown">
      <DrilldownEntries currentPage={currentPage} navItems={items} />
    </p-drilldown>
    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the header navigation: the menu button opens the drilldown, and the drilldown reports the level
      // the user drilled into.

      const navButton = document.getElementById('nav-button');
      const navDrilldown = document.getElementById('nav-drilldown');

      navButton.addEventListener('click', () => {
        navDrilldown.open = true;
      });

      // Closing is requested by the component (Escape, the close button, a click on the backdrop) – the open state is
      // owned by the page, so it has to be written back.
      navDrilldown.addEventListener('dismiss', (e) => {
        e.target.open = false;
      });

      navDrilldown.addEventListener('update', (e) => {
        e.target.activeIdentifier = e.detail.activeIdentifier;
      });
    `
    }</Script>
  </nav>
);
