import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-week/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-week/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-week/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-week/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputWeekMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-week/default',
  examples: ['components/input-week/form', 'components/input-week/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-week/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-week/accessibility/placeholder-used-as-the-only-label',
      'components/input-week/accessibility/hidden-label-without-accessible-name',
      'components/input-week/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-week'],
} satisfies ComponentDocsMeta<'p-input-week'>;
