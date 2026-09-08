import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnTriggerButtonHostVsAriaPropA11yExample } from '@/app/(main)/components/drilldown/accessibility/examples/aria-on-trigger-button-host-vs-aria-prop/example';
import { drilldownLabelOnComponentHostVsAriaPropA11yExample } from '@/app/(main)/components/drilldown/accessibility/examples/drilldown-label-on-component-host-vs-aria-prop/example';
import { triggerWithoutPopupSemanticsOrContextA11yExample } from '@/app/(main)/components/drilldown/accessibility/examples/trigger-without-popup-semantics-or-context/example';
import AccessibilityOverview from '@/app/(main)/components/drilldown/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/drilldown/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/drilldown/configurator/introduction.mdx';
import { drilldownStory } from '@/app/(main)/components/drilldown/configurator/story';
import CustomContentDescription from '@/app/(main)/components/drilldown/examples/custom-content/example.mdx';
import { drilldownStoryCustomContent } from '@/app/(main)/components/drilldown/examples/custom-content/story';
import Usage from '@/app/(main)/components/drilldown/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const drilldownMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: drilldownStory,
  },
  examples: {
    customContent: {
      kind: 'story',
      name: 'Example with custom content',
      description: CustomContentDescription,
      story: drilldownStoryCustomContent,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnTriggerButtonHostVsAriaProp: ariaOnTriggerButtonHostVsAriaPropA11yExample,
      drilldownLabelOnComponentHostVsAriaProp: drilldownLabelOnComponentHostVsAriaPropA11yExample,
      triggerWithoutPopupSemanticsOrContext: triggerWithoutPopupSemanticsOrContextA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-drilldown'],
} satisfies ComponentDocsMeta<'p-drilldown'>;
