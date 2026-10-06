/** A category of the shop chrome – a placeholder link, like every link of the demo chrome. */
export type CategoryItem = {
  href: string;
  label: string;
};

/** The categories the `stacked` header shows unless a page passes its own. */
export const categoryItems: CategoryItem[] = [
  { href: '#', label: 'All categories' },
  { href: '#', label: 'Timepieces' },
  { href: '#', label: 'Bags & Luggage' },
  { href: '#', label: 'Heritage' },
  { href: '#', label: 'Vehicle Accessories' },
  { href: '#', label: 'Eyewear' },
];

type CategoryTabsProps = {
  items?: CategoryItem[];
};

/**
 * Secondary navigation below the header bar, as a shop would show its categories.
 *
 * It is its own labelled landmark, so a screen reader can tell it apart from the main navigation. `p-tabs-bar`
 * accepts only `a` and `button` children – anything else (a divider, a wrapper) makes it throw – so the entries are
 * plain anchors.
 */
export const CategoryTabs = ({ items = categoryItems }: CategoryTabsProps) => (
  <nav class="col-full flex justify-center p-static-md border-t-thin border-contrast-low" aria-label="Categories">
    <p-tabs-bar compact={true}>
      {items.map((item) => (
        <a key={item.label} href={item.href}>
          {item.label}
        </a>
      ))}
    </p-tabs-bar>
  </nav>
);
