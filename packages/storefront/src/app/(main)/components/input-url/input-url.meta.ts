import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-url/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-url/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-url/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-url/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputUrlMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-url/default',
  examples: ['components/input-url/form', 'components/input-url/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-url/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-url/accessibility/placeholder-used-as-the-only-label',
      'components/input-url/accessibility/hidden-label-without-accessible-name',
      'components/input-url/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-url'],
} satisfies ComponentDocsMeta<'p-input-url'>;
