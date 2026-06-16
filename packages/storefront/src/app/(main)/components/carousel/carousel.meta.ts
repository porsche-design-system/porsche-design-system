import { componentMeta } from '@porsche-design-system/component-meta';
import {
  carouselExampleDynamicSlides,
  carouselExampleFocusOnCenterSlide,
  carouselExampleJumpToSlide,
} from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/carousel/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/carousel/configurator/introduction.mdx';
import { carouselStory } from '@/app/(main)/components/carousel/configurator/story';
import DynamicSlidesDescription from '@/app/(main)/components/carousel/examples/dynamic-slides/example.mdx';
import FlexibleWidthsDescription from '@/app/(main)/components/carousel/examples/flexible-widths/example.mdx';
import { carouselStoryFlexibleWidths } from '@/app/(main)/components/carousel/examples/flexible-widths/story';
import FocusOnCenterSlideDescription from '@/app/(main)/components/carousel/examples/focus-on-center-slide/example.mdx';
import IntlDescription from '@/app/(main)/components/carousel/examples/intl/example.mdx';
import { carouselStoryIntl } from '@/app/(main)/components/carousel/examples/intl/story';
import JumpToSlideDescription from '@/app/(main)/components/carousel/examples/jump-to-slide/example.mdx';
import Usage from '@/app/(main)/components/carousel/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const carouselMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: carouselStory,
  },
  examples: {
    flexibleWidths: {
      kind: 'story',
      name: 'Slides with flexible widths',
      description: FlexibleWidthsDescription,
      story: carouselStoryFlexibleWidths,
    },
    jumpToSlide: {
      kind: 'example',
      name: 'Jump to slide (activeSlideIndex)',
      description: JumpToSlideDescription,
      example: carouselExampleJumpToSlide,
    },
    dynamicSlides: {
      kind: 'example',
      name: 'Add/remove slides',
      description: DynamicSlidesDescription,
      example: carouselExampleDynamicSlides,
    },
    focusOnCenterSlide: {
      kind: 'example',
      name: 'Centered Slide and Gradient Customization',
      description: FocusOnCenterSlideDescription,
      example: carouselExampleFocusOnCenterSlide,
    },
    intl: {
      kind: 'story',
      name: 'Internationalization (i18n)',
      description: IntlDescription,
      story: carouselStoryIntl,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-carousel'],
} satisfies ComponentDocsMeta<'p-carousel'>;

