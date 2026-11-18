import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/accordion/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/accordion/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/accordion/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/accordion/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const accordionMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/accordion/default',
  examples: ['components/accordion/sticky-summary', 'components/accordion/interactive-elements-in-summary'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/accordion/accessibility/accordion-summary-without-semantic-heading',
      'components/accordion/accessibility/skipped-heading-level',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-accordion'],
} satisfies ComponentDocsMeta<'p-accordion'>;
