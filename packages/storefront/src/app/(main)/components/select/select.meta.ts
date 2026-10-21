import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/select/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/select/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/select/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/select/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const selectMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/select/default',
  examples: [
    'components/select/form',
    'components/select/required',
    'components/select/slotted-images',
    'components/select/slots',
    'components/select/set-value',
    'components/select/optgroups',
    'components/select/async-filter',
    'components/select/selected-slot',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/select/accessibility/aria-on-component-host-vs-aria-prop',
      'components/select/accessibility/prompt-option-used-instead-of-a-label',
      'components/select/accessibility/ambiguous-option-labels-without-field-context',
      'components/select/accessibility/hidden-label-without-accessible-name',
      'components/select/accessibility/validation-feedback-via-state-and-message-api',
      'components/select/accessibility/error-state-without-recovery-guidance',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-select'],
} satisfies ComponentDocsMeta<'p-select'>;
