import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/input-search/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-search/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-search/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-search/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputSearchMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/input-search/default',
  examples: ['components/input-search/form', 'components/input-search/slots', 'components/input-search/aria-combobox'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/input-search/accessibility/placeholder-used-as-the-only-label',
      'components/input-search/accessibility/aria-on-component-host-vs-aria-prop',
      'components/input-search/accessibility/hidden-label-without-accessible-name',
      'components/input-search/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-search'],
} satisfies ComponentDocsMeta<'p-input-search'>;
