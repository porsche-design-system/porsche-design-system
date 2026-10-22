import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-time/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-time/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-time/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-time/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputTimeMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-time/default',
  examples: ['components/input-time/form', 'components/input-time/slots'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-time/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-time/accessibility/placeholder-used-as-the-only-label',
      'components/input-time/accessibility/hidden-label-without-accessible-name',
      'components/input-time/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-time'],
} satisfies ComponentDocsMeta<'p-input-time'>;
