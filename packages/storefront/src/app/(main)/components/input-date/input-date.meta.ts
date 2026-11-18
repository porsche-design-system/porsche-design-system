import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-date/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-date/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-date/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-date/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputDateMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-date/default',
  examples: ['components/input-date/form', 'components/input-date/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-date/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-date/accessibility/placeholder-used-as-the-only-label',
      'components/input-date/accessibility/hidden-label-without-accessible-name',
      'components/input-date/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-date'],
} satisfies ComponentDocsMeta<'p-input-date'>;
