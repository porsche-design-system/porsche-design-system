import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-month/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-month/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-month/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-month/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputMonthMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-month/default',
  examples: ['components/input-month/form', 'components/input-month/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-month/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-month/accessibility/placeholder-used-as-the-only-label',
      'components/input-month/accessibility/hidden-label-without-accessible-name',
      'components/input-month/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-month'],
} satisfies ComponentDocsMeta<'p-input-month'>;
