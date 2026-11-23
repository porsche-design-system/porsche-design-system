import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/carousel/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/carousel/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/carousel/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/carousel/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const carouselMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/carousel/default',
  examples: [
    'components/carousel/flexible-widths',
    'components/carousel/jump-to-slide',
    'components/carousel/dynamic-slides',
    'components/carousel/focus-on-center-slide',
    'components/carousel/intl',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/carousel/accessibility/aria-on-component-host-vs-aria-prop',
      'components/carousel/accessibility/carousel-without-skip-path-for-keyboard-users',
      'components/carousel/accessibility/vague-carousel-label',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-carousel'],
} satisfies ComponentDocsMeta<'p-carousel'>;
