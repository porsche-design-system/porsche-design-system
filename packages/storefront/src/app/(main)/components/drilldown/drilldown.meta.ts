import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/drilldown/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/drilldown/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/drilldown/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/drilldown/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const drilldownMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/drilldown/default',
  examples: ['components/drilldown/custom-content'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/drilldown/accessibility/aria-on-trigger-button-host-vs-aria-prop',
      'components/drilldown/accessibility/drilldown-label-on-component-host-vs-aria-prop',
      'components/drilldown/accessibility/trigger-without-popup-semantics-or-context',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-drilldown'],
} satisfies ComponentDocsMeta<'p-drilldown'>;
