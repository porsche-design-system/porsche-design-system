import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/tile/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tile/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tile/configurator/introduction.mdx';
import { tileSlotStories, tileStory } from '@/app/(main)/components/tile/configurator/story';
import ArticleDescription from '@/app/(main)/components/tile/examples/article/example.mdx';
import { tileStoryArticle } from '@/app/(main)/components/tile/examples/article/story';
import CallToActionDescription from '@/app/(main)/components/tile/examples/call-to-action/example.mdx';
import { tileStoryCallToAction } from '@/app/(main)/components/tile/examples/call-to-action/story';
import CategoryDescription from '@/app/(main)/components/tile/examples/category/example.mdx';
import { tileStoryCategory } from '@/app/(main)/components/tile/examples/category/story';
import EditorialTeaserDescription from '@/app/(main)/components/tile/examples/editorial-teaser/example.mdx';
import { tileStoryEditorialTeaser } from '@/app/(main)/components/tile/examples/editorial-teaser/story';
import FeatureDescription from '@/app/(main)/components/tile/examples/feature/example.mdx';
import { tileStoryFeature } from '@/app/(main)/components/tile/examples/feature/story';
import FeatureHighlightDescription from '@/app/(main)/components/tile/examples/feature-highlight/example.mdx';
import { tileStoryFeatureHighlight } from '@/app/(main)/components/tile/examples/feature-highlight/story';
import ImageCategoryDescription from '@/app/(main)/components/tile/examples/image-category/example.mdx';
import { tileStoryImageCategory } from '@/app/(main)/components/tile/examples/image-category/story';
import ModelNavigationDescription from '@/app/(main)/components/tile/examples/model-navigation/example.mdx';
import { tileStoryModelNavigation } from '@/app/(main)/components/tile/examples/model-navigation/story';
import ModelSelectionDescription from '@/app/(main)/components/tile/examples/model-selection/example.mdx';
import { tileStoryModelSelection } from '@/app/(main)/components/tile/examples/model-selection/story';
import ModelTeaserDescription from '@/app/(main)/components/tile/examples/model-teaser/example.mdx';
import { tileStoryModelTeaser } from '@/app/(main)/components/tile/examples/model-teaser/story';
import ProductDescription from '@/app/(main)/components/tile/examples/product/example.mdx';
import { tileStoryProduct } from '@/app/(main)/components/tile/examples/product/story';
import ProductTeaserDescription from '@/app/(main)/components/tile/examples/product-teaser/example.mdx';
import { tileStoryProductTeaser } from '@/app/(main)/components/tile/examples/product-teaser/story';
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
    editorialTeaser: {
      kind: 'story',
      name: 'Editorial Teaser',
      description: EditorialTeaserDescription,
      story: tileStoryEditorialTeaser,
    },
    article: {
      kind: 'story',
      name: 'Article',
      description: ArticleDescription,
      story: tileStoryArticle,
    },
    feature: {
      kind: 'story',
      name: 'Feature',
      description: FeatureDescription,
      story: tileStoryFeature,
    },
    featureHighlight: {
      kind: 'story',
      name: 'Feature Highlight',
      description: FeatureHighlightDescription,
      story: tileStoryFeatureHighlight,
    },
    callToAction: {
      kind: 'story',
      name: 'Call to Action',
      description: CallToActionDescription,
      story: tileStoryCallToAction,
    },
    modelTeaser: {
      kind: 'story',
      name: 'Model Teaser',
      description: ModelTeaserDescription,
      story: tileStoryModelTeaser,
    },
    productTeaser: {
      kind: 'story',
      name: 'Product Teaser',
      description: ProductTeaserDescription,
      story: tileStoryProductTeaser,
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
