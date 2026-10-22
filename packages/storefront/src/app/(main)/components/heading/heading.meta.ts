import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/heading/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/heading/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/heading/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/heading/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const headingMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/heading/default',
  examples: ['components/heading/semantics', 'components/heading/color'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: ['components/heading/accessibility/skipped-heading-level'],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-heading'],
} satisfies ComponentDocsMeta<'p-heading'>;
