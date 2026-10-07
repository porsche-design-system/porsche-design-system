import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/tile/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tile/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tile/configurator/introduction.mdx';
import { tileSlotStories, tileStory } from '@/app/(main)/components/tile/configurator/story';
import CategoryDescription from '@/app/(main)/components/tile/examples/category/example.mdx';
import { tileStoryCategory } from '@/app/(main)/components/tile/examples/category/story';
import ImageCategoryDescription from '@/app/(main)/components/tile/examples/image-category/example.mdx';
import { tileStoryImageCategory } from '@/app/(main)/components/tile/examples/image-category/story';
import ModelNavigationDescription from '@/app/(main)/components/tile/examples/model-navigation/example.mdx';
import { tileStoryModelNavigation } from '@/app/(main)/components/tile/examples/model-navigation/story';
import ModelSelectionDescription from '@/app/(main)/components/tile/examples/model-selection/example.mdx';
import { tileStoryModelSelection } from '@/app/(main)/components/tile/examples/model-selection/story';
import ProductDescription from '@/app/(main)/components/tile/examples/product/example.mdx';
import { tileStoryProduct } from '@/app/(main)/components/tile/examples/product/story';
import TeaserDescription from '@/app/(main)/components/tile/examples/teaser/example.mdx';
import { tileStoryTeaser } from '@/app/(main)/components/tile/examples/teaser/story';
import VehicleListingDescription from '@/app/(main)/components/tile/examples/vehicle-listing/example.mdx';
import { tileStoryVehicleListing } from '@/app/(main)/components/tile/examples/vehicle-listing/story';
import Usage from '@/app/(main)/components/tile/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tileMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: tileStory,
    slotStories: tileSlotStories,
  },
  examples: {
    modelSelection: {
      kind: 'story',
      name: 'Model Selection',
      description: ModelSelectionDescription,
      story: tileStoryModelSelection,
    },
    modelNavigation: {
      kind: 'story',
      name: 'Model Navigation',
      description: ModelNavigationDescription,
      story: tileStoryModelNavigation,
    },
    vehicleListing: {
      kind: 'story',
      name: 'Vehicle Listing',
      description: VehicleListingDescription,
      story: tileStoryVehicleListing,
    },
    category: {
      kind: 'story',
      name: 'Category',
      description: CategoryDescription,
      story: tileStoryCategory,
    },
    imageCategory: {
      kind: 'story',
      name: 'Image Category',
      description: ImageCategoryDescription,
      story: tileStoryImageCategory,
    },
    product: {
      kind: 'story',
      name: 'Product',
      description: ProductDescription,
      story: tileStoryProduct,
    },
    teaser: {
      kind: 'story',
      name: 'Teaser',
      description: TeaserDescription,
      story: tileStoryTeaser,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {},
    tests: AccessibilityTests,
  },
  api: componentMeta['p-tile'],
} satisfies ComponentDocsMeta<'p-tile'>;
