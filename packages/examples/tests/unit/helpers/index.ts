import type { NavItem } from '../../../src/_partials/header/MainNav.tsx';
import FeedbackDialogPage from '../../../src/patterns/feedback/dialog/index.page.tsx';
import FeedbackInlinePage from '../../../src/patterns/feedback/inline/index.page.tsx';
import FooterPatternPage from '../../../src/patterns/footer/index.page.tsx';
import HeaderOverlayPage from '../../../src/patterns/header/overlay/index.page.tsx';
import HeaderStackedPage from '../../../src/patterns/header/stacked/index.page.tsx';
import PopoverFeatureTourPage from '../../../src/patterns/popover/feature-tour/index.page.tsx';
import PopoverLocalMarketSwitchPage from '../../../src/patterns/popover/local-market-switch/index.page.tsx';
import PopoverPriorityNavigationPage from '../../../src/patterns/popover/priority-navigation/index.page.tsx';
import TileCallToActionPage from '../../../src/patterns/tile/call-to-action/index.page.tsx';
import TileCategoryPage from '../../../src/patterns/tile/category/index.page.tsx';
import TileFeaturePage from '../../../src/patterns/tile/feature/index.page.tsx';
import TileFeatureHighlightPage from '../../../src/patterns/tile/feature-highlight/index.page.tsx';
import TileImageCategoryPage from '../../../src/patterns/tile/image-category/index.page.tsx';
import TileModelNavigationPage from '../../../src/patterns/tile/model-navigation/index.page.tsx';
import TileModelSelectionPage from '../../../src/patterns/tile/model-selection/index.page.tsx';
import TileModelTeaserPage from '../../../src/patterns/tile/model-teaser/index.page.tsx';
import TileProductPage from '../../../src/patterns/tile/product/index.page.tsx';
import TileProductTeaserPage from '../../../src/patterns/tile/product-teaser/index.page.tsx';
import TileVehicleListingPage from '../../../src/patterns/tile/vehicle-listing/index.page.tsx';
import TileVideoPage from '../../../src/patterns/tile/video/index.page.tsx';
import AdminPanelPage from '../../../src/templates/admin-panel/index.page.tsx';
import LandingPage from '../../../src/templates/landing-page/index.page.tsx';

/** What the unit specs share: the pages under test, and the few string helpers the markup assertions need. */

export const countOccurrences = (haystack: string, needle: string): number => haystack.split(needle).length - 1;

/** The opening tag an id belongs to, so an attribute can be asserted on the element rather than on the document. */
export const getOpeningTag = (html: string, id: string): string => {
  const start = html.lastIndexOf('<', html.indexOf(`id="${id}"`));

  return html.slice(start, html.indexOf('>', start) + 1);
};

/** Every entry of the navigation tree, at any depth. */
export const flattenNavItems = (items: NavItem[]): NavItem[] =>
  items.flatMap((item) => [item, ...flattenNavItems(item.children ?? [])]);

/**
 * A first level heading is either a plain `<h1>` or a `<p-heading tag="h1">`, which renders the `h1` in its shadow
 * root and therefore never appears in the static markup.
 */
export const countFirstLevelHeadings = (html: string): number =>
  (html.match(/<h1[\s>]/g) ?? []).length + countOccurrences(html, 'tag="h1"');

/** Templates are built on `TemplatePage`: whole pages, whichever chrome they compose – `Header` and `Footer` or `p-canvas`. */
export const templatePages = [
  ['templates/landing-page', LandingPage],
  ['templates/admin-panel', AdminPanelPage],
] as const;

/** Patterns are built on `PatternPage`: they show a single section in the place it occupies on a real page. */
export const patternPages = [
  ['patterns/header/overlay', HeaderOverlayPage],
  ['patterns/header/stacked', HeaderStackedPage],
  ['patterns/footer', FooterPatternPage],
  ['patterns/popover/local-market-switch', PopoverLocalMarketSwitchPage],
  ['patterns/popover/priority-navigation', PopoverPriorityNavigationPage],
  ['patterns/popover/feature-tour', PopoverFeatureTourPage],
  ['patterns/feedback/inline', FeedbackInlinePage],
  ['patterns/feedback/dialog', FeedbackDialogPage],
  ['patterns/tile/model-selection', TileModelSelectionPage],
  ['patterns/tile/model-navigation', TileModelNavigationPage],
  ['patterns/tile/category', TileCategoryPage],
  ['patterns/tile/image-category', TileImageCategoryPage],
  ['patterns/tile/video', TileVideoPage],
  ['patterns/tile/product', TileProductPage],
  ['patterns/tile/vehicle-listing', TileVehicleListingPage],
  ['patterns/tile/feature', TileFeaturePage],
  ['patterns/tile/feature-highlight', TileFeatureHighlightPage],
  ['patterns/tile/call-to-action', TileCallToActionPage],
  ['patterns/tile/model-teaser', TileModelTeaserPage],
  ['patterns/tile/product-teaser', TileProductTeaserPage],
] as const;

/** The tile patterns – one use case of a tile each, built with HTML and Tailwind CSS instead of `p-tile`. */
export const tilePages = patternPages.filter(([path]) => path.startsWith('patterns/tile/'));

export const examplePages = [...templatePages, ...patternPages];
