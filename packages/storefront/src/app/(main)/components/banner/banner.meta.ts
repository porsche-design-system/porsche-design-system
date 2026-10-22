import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/banner/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/banner/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/banner/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/banner/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const bannerMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/banner/default',
  examples: ['components/banner/customization'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/banner/accessibility/banner-mounted-only-when-shown',
      'components/banner/accessibility/error-feedback-without-descriptive-content',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-banner'],
} satisfies ComponentDocsMeta<'p-banner'>;
