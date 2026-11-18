import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-password/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-password/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-password/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-password/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputPasswordMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-password/default',
  examples: ['components/input-password/form', 'components/input-password/toggle', 'components/input-password/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-password/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-password/accessibility/placeholder-used-as-the-only-label',
      'components/input-password/accessibility/hidden-label-without-accessible-name',
      'components/input-password/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-password'],
} satisfies ComponentDocsMeta<'p-input-password'>;
