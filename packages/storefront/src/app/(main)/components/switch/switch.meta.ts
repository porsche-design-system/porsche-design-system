import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/switch/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/switch/accessibility/hidden-label-without-accessible-name/example';
import { switchWithoutDescriptiveLabelA11yExample } from '@porsche-design-system/examples-stories/components/switch/accessibility/switch-without-descriptive-label/example';
import { switchStory } from '@porsche-design-system/examples-stories/components/switch/default/story';
import AccessibilityOverview from '@/app/(main)/components/switch/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/switch/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/switch/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/switch/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const switchMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: switchStory,
  },
  examples: {},
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      switchWithoutDescriptiveLabel: switchWithoutDescriptiveLabelA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-switch'],
} satisfies ComponentDocsMeta<'p-switch'>;
