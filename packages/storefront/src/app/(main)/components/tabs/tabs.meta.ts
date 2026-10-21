import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/tabs/accessibility/aria-on-component-host-vs-aria-prop/example';
import { vagueTabLabelsWithoutContextA11yExample } from '@porsche-design-system/examples-stories/components/tabs/accessibility/vague-tab-labels-without-context/example';
import ActiveTabDescription from '@porsche-design-system/examples-stories/components/tabs/active-tab/example.mdx';
import { tabsStoryActiveTabIndex } from '@porsche-design-system/examples-stories/components/tabs/active-tab/story';
import { tabsStory } from '@porsche-design-system/examples-stories/components/tabs/default/story';
import GradientDescription from '@porsche-design-system/examples-stories/components/tabs/gradient/example.mdx';
import { tabsStoryGradient } from '@porsche-design-system/examples-stories/components/tabs/gradient/story';
import LabellingDescription from '@porsche-design-system/examples-stories/components/tabs/labelling/example.mdx';
import { tabsStoryLabelling } from '@porsche-design-system/examples-stories/components/tabs/labelling/story';
import AccessibilityOverview from '@/app/(main)/components/tabs/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tabs/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tabs/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/tabs/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tabsMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: tabsStory,
  },
  examples: {
    gradient: {
      kind: 'story',
      name: 'Gradient color',
      description: GradientDescription,
      story: tabsStoryGradient,
    },
    activeTab: {
      kind: 'story',
      name: 'Active Tab',
      description: ActiveTabDescription,
      story: tabsStoryActiveTabIndex,
    },
    labelling: {
      kind: 'story',
      name: 'Labelling',
      description: LabellingDescription,
      story: tabsStoryLabelling,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      vagueTabLabelsWithoutContext: vagueTabLabelsWithoutContextA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-tabs'],
} satisfies ComponentDocsMeta<'p-tabs'>;
