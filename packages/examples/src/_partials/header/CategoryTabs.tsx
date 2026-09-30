import { type LinkItem, placeholderHref } from '../../_links.ts';

/** The categories the `stacked` header shows unless a page passes its own. */
export const categoryItems: LinkItem[] = [
  { href: placeholderHref, label: 'All categories' },
  { href: placeholderHref, label: 'Timepieces' },
  { href: placeholderHref, label: 'Bags & Luggage' },
  { href: placeholderHref, label: 'Heritage' },
  { href: placeholderHref, label: 'Vehicle Accessories' },
  { href: placeholderHref, label: 'Eyewear' },
];

type CategoryTabsProps = {
  items?: LinkItem[];
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
