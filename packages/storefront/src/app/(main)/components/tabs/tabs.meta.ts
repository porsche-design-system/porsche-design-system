import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/tabs/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tabs/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tabs/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/tabs/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tabsMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/tabs/default',
  examples: ['components/tabs/gradient', 'components/tabs/active-tab', 'components/tabs/labelling'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/tabs/accessibility/aria-on-component-host-vs-aria-prop',
      'components/tabs/accessibility/vague-tab-labels-without-context',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-tabs'],
} satisfies ComponentDocsMeta<'p-tabs'>;
