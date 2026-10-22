import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/switch/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/switch/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/switch/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/switch/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const switchMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/switch/default',
  examples: [],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/switch/accessibility/aria-on-component-host-vs-aria-prop',
      'components/switch/accessibility/switch-without-descriptive-label',
      'components/switch/accessibility/hidden-label-without-accessible-name',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-switch'],
} satisfies ComponentDocsMeta<'p-switch'>;
