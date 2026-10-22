import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-tel/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-tel/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-tel/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-tel/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputTelMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-tel/default',
  examples: ['components/input-tel/form', 'components/input-tel/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-tel/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-tel/accessibility/placeholder-used-as-the-only-label',
      'components/input-tel/accessibility/hidden-label-without-accessible-name',
      'components/input-tel/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-tel'],
} satisfies ComponentDocsMeta<'p-input-tel'>;
