import { componentMeta } from '@porsche-design-system/component-meta';
import {
  carouselExampleDynamicSlides,
  carouselExampleFocusOnCenterSlide,
  carouselExampleJumpToSlide,
} from '@porsche-design-system/examples-framework';
import DynamicSlidesDescription from '@porsche-design-system/examples-framework/components/carousel/dynamic-slides/example.mdx';
import FocusOnCenterSlideDescription from '@porsche-design-system/examples-framework/components/carousel/focus-on-center-slide/example.mdx';
import JumpToSlideDescription from '@porsche-design-system/examples-framework/components/carousel/jump-to-slide/example.mdx';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/carousel/accessibility/aria-on-component-host-vs-aria-prop/example';
import { carouselWithoutSkipPathForKeyboardUsersA11yExample } from '@porsche-design-system/examples-stories/components/carousel/accessibility/carousel-without-skip-path-for-keyboard-users/example';
import { vagueCarouselLabelA11yExample } from '@porsche-design-system/examples-stories/components/carousel/accessibility/vague-carousel-label/example';
import { carouselStory } from '@porsche-design-system/examples-stories/components/carousel/default/story';
import FlexibleWidthsDescription from '@porsche-design-system/examples-stories/components/carousel/flexible-widths/example.mdx';
import { carouselStoryFlexibleWidths } from '@porsche-design-system/examples-stories/components/carousel/flexible-widths/story';
import IntlDescription from '@porsche-design-system/examples-stories/components/carousel/intl/example.mdx';
import { carouselStoryIntl } from '@porsche-design-system/examples-stories/components/carousel/intl/story';
import AccessibilityOverview from '@/app/(main)/components/carousel/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/carousel/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/carousel/configurator/introduction.mdx';
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
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      carouselWithoutSkipPathForKeyboardUsers: carouselWithoutSkipPathForKeyboardUsersA11yExample,
      vagueCarouselLabel: vagueCarouselLabelA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-carousel'],
} satisfies ComponentDocsMeta<'p-carousel'>;
