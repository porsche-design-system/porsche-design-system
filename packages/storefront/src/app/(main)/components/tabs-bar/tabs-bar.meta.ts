import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/tabs-bar/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tabs-bar/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tabs-bar/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/tabs-bar/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tabsBarMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/tabs-bar/default',
  examples: ['components/tabs-bar/links', 'components/tabs-bar/gradient', 'components/tabs-bar/labelling'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/tabs-bar/accessibility/tabbed-interface-without-tablist-label',
      'components/tabs-bar/accessibility/route-navigation-without-landmark-label',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-tabs-bar'],
} satisfies ComponentDocsMeta<'p-tabs-bar'>;
