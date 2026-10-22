import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/multi-select/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/multi-select/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/multi-select/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/multi-select/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const multiSelectMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/multi-select/default',
  examples: [
    'components/multi-select/form',
    'components/multi-select/slots',
    'components/multi-select/set-value',
    'components/multi-select/optgroups',
    'components/multi-select/async-filter',
    'components/multi-select/selected-slot',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/multi-select/accessibility/aria-on-component-host-vs-aria-prop',
      'components/multi-select/accessibility/prompt-option-used-instead-of-a-label',
      'components/multi-select/accessibility/hidden-label-without-accessible-name',
      'components/multi-select/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-multi-select'],
} satisfies ComponentDocsMeta<'p-multi-select'>;
