import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/divider/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/divider/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/divider/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/divider/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const dividerMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/divider/default',
  examples: ['components/divider/vertical', 'components/divider/responsive'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: ['components/divider/accessibility/divider-as-the-only-section-separator'],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-divider'],
} satisfies ComponentDocsMeta<'p-divider'>;
