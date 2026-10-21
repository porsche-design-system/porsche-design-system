import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/radio-group/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/radio-group/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/radio-group/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/radio-group/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const radioGroupMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/radio-group/default',
  examples: ['components/radio-group/form', 'components/radio-group/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/radio-group/accessibility/missing-group-label',
      'components/radio-group/accessibility/hidden-label-without-accessible-name',
      'components/radio-group/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-radio-group'],
} satisfies ComponentDocsMeta<'p-radio-group'>;
