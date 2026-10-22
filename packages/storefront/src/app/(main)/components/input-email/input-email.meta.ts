import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-email/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-email/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-email/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-email/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputEmailMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-email/default',
  examples: ['components/input-email/form', 'components/input-email/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-email/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-email/accessibility/placeholder-used-as-the-only-label',
      'components/input-email/accessibility/hidden-label-without-accessible-name',
      'components/input-email/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-email'],
} satisfies ComponentDocsMeta<'p-input-email'>;
