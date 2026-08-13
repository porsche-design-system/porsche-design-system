import { categoryItems, type LinkItem, metaActionItems, type NavItem, noticeText } from '../../_data.ts';
import { Brand } from './Brand.tsx';
import { CategoryTabs } from './CategoryTabs.tsx';
import { HeaderBar } from './HeaderBar.tsx';
import { MainNav } from './MainNav.tsx';
import { MetaActions } from './MetaActions.tsx';
import { NoticeBar } from './NoticeBar.tsx';

/**
 * Layout variations of the same header, each showcased by a pattern page.
 *
 * `overlay` lies on top of the content, over a hero image or video, and is reduced to the bar itself. `stacked` sits
 * above the content and adds a note on top and the category navigation below. What they share – the bar, the brand,
 * the navigation, the icon affordances – are the components in this folder, so a variant cannot drift from its
 * sibling: only the arrangement and the chosen affordances differ.
 *
 * The names deliberately avoid Tailwind utility names: the scanner reads these files whole, comments included, so a
 * variant named after a display utility would leak that unused utility into the compiled stylesheet.
 */
export type HeaderVariant = 'overlay' | 'stacked';

type HeaderProps = {
  /** Id of the active `NavItem`; only that one gets `aria-current="page"`. */
  currentPage: string;
  /** Placeholder links – the header demonstrates a navigation, it does not provide one. */
  navItems: NavItem[];
  /** Renders the search affordance, which both variants show in the same place. */
  showSearch?: boolean;
  variant?: HeaderVariant;
  /** Only the `stacked` variant has a row for it. */
  notice?: string;
  /** Only the `stacked` variant has a row for them. */
  categoryItems?: LinkItem[];
};

/** Ids of the meta actions each variant shows, in the order `metaActionItems` defines. */
const actionIds: Record<HeaderVariant, string[]> = {
  overlay: ['search', 'user'],
  stacked: ['search', 'favorites', 'cart', 'user'],
};

const getActions = (variant: HeaderVariant, showSearch: boolean) =>
  metaActionItems.filter((item) => actionIds[variant].includes(item.id) && (showSearch || item.id !== 'search'));

/** Page header with the main navigation and an optional search affordance. */
export const Header = ({
  currentPage,
  navItems,
  showSearch = false,
  variant = 'overlay',
  notice = noticeText,
  categoryItems: pageCategoryItems = categoryItems,
}: HeaderProps) => {
  /**
   * The `overlay` variant lies on a dark hero, so its contents need the dark scheme – but the scheme is handed to
   * the blocks rather than set on the `<header>`. The drilldown lives inside the header and is a dialog on top of
   * the page, not on top of the hero: a scheme on the `<header>` would cascade into it and open a dark overlay on a
   * light page. Each block therefore applies it to the elements that really sit on the hero.
   */
  const scheme = variant === 'overlay' ? 'scheme-dark' : undefined;

  const bar = (
    <HeaderBar
      start={<MainNav currentPage={currentPage} navItems={navItems} scheme={scheme} />}
      center={<Brand scheme={scheme} />}
      end={<MetaActions items={getActions(variant, showSearch)} scheme={scheme} />}
    />
  );

  return variant === 'stacked' ? (
    <header class="grid-template gap-y-0">
      <NoticeBar>{notice}</NoticeBar>
      {bar}
      <CategoryTabs items={pageCategoryItems} />
    </header>
  ) : (
    // The fade keeps the contrast of the affordances over an arbitrary image or video. It is a fixed gradient, so it
    // needs no scheme of its own.
    <header class="z-1 grid-template absolute inset-x-0 before:absolute before:inset-[0_0_-60px_0] before:-z-1 before:pointer-events-none before:bg-fade-to-b">
      {bar}
    </header>
  );
};
