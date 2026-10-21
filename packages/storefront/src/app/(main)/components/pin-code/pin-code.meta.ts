import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/pin-code/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/pin-code/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/pin-code/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/pin-code/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const pinCodeMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/pin-code/default',
  examples: ['components/pin-code/form', 'components/pin-code/copy-paste', 'components/pin-code/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/pin-code/accessibility/missing-field-label',
      'components/pin-code/accessibility/hidden-label-without-accessible-name',
      'components/pin-code/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-pin-code'],
} satisfies ComponentDocsMeta<'p-pin-code'>;
