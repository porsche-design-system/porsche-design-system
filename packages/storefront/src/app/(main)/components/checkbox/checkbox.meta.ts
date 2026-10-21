import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/checkbox/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/checkbox/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/checkbox/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/checkbox/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const checkboxMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/checkbox/default',
  examples: [
    'components/checkbox/form',
    'components/checkbox/indeterminate',
    'components/checkbox/slots',
    'components/checkbox/wrapped-label',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/checkbox/accessibility/aria-on-component-host-vs-aria-prop',
      'components/checkbox/accessibility/hidden-label-without-accessible-name',
      'components/checkbox/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-checkbox'],
} satisfies ComponentDocsMeta<'p-checkbox'>;
