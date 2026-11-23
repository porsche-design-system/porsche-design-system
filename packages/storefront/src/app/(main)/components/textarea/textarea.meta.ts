import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/textarea/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/textarea/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/textarea/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/textarea/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const textareaMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/textarea/default',
  examples: ['components/textarea/form', 'components/textarea/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/textarea/accessibility/aria-on-component-host-vs-aria-prop',
      'components/textarea/accessibility/placeholder-only-instructions-for-open-text-input',
      'components/textarea/accessibility/hidden-label-without-accessible-name',
      'components/textarea/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-textarea'],
} satisfies ComponentDocsMeta<'p-textarea'>;
