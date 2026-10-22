import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-text/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-text/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-text/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-text/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputTextMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-text/default',
  examples: ['components/input-text/form', 'components/input-text/controlled', 'components/input-text/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-text/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-text/accessibility/placeholder-used-as-the-only-label',
      'components/input-text/accessibility/hidden-label-without-accessible-name',
      'components/input-text/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-text'],
} satisfies ComponentDocsMeta<'p-input-text'>;
