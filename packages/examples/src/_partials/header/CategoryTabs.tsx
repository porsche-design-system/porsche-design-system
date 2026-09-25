import type { LinkItem } from '../../_data.ts';

type CategoryTabsProps = {
  items: LinkItem[];
};

/**
 * Secondary navigation below the header bar, as a shop would show its categories.
 *
 * It is its own labelled landmark, so a screen reader can tell it apart from the main navigation. `p-tabs-bar`
 * accepts only `a` and `button` children – anything else (a divider, a wrapper) makes it throw – so the entries are
 * plain anchors.
 */
export const CategoryTabs = ({ items }: CategoryTabsProps) => (
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
