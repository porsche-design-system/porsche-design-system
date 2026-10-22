import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-number/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-number/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-number/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-number/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputNumberMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-number/default',
  examples: ['components/input-number/form', 'components/input-number/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-number/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-number/accessibility/placeholder-used-as-the-only-label',
      'components/input-number/accessibility/hidden-label-without-accessible-name',
      'components/input-number/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-number'],
} satisfies ComponentDocsMeta<'p-input-number'>;
