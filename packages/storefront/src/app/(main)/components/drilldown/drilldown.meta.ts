import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnTriggerButtonHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/drilldown/accessibility/aria-on-trigger-button-host-vs-aria-prop/example';
import { drilldownLabelOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/drilldown/accessibility/drilldown-label-on-component-host-vs-aria-prop/example';
import { triggerWithoutPopupSemanticsOrContextA11yExample } from '@porsche-design-system/examples-stories/components/drilldown/accessibility/trigger-without-popup-semantics-or-context/example';
import CustomContentDescription from '@porsche-design-system/examples-stories/components/drilldown/custom-content/example.mdx';
import { drilldownStoryCustomContent } from '@porsche-design-system/examples-stories/components/drilldown/custom-content/story';
import { drilldownStory } from '@porsche-design-system/examples-stories/components/drilldown/default/story';
import AccessibilityOverview from '@/app/(main)/components/drilldown/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/drilldown/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/drilldown/configurator/introduction.mdx';
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
