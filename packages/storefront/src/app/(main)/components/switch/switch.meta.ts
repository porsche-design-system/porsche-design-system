import { componentMeta } from '@porsche-design-system/component-meta';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/switch/accessibility/examples/hidden-label-without-accessible-name/example';
import { switchWithoutDescriptiveLabelA11yExample } from '@/app/(main)/components/switch/accessibility/examples/switch-without-descriptive-label/example';
import AccessibilityOverview from '@/app/(main)/components/switch/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/switch/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/switch/configurator/introduction.mdx';
import { switchStory } from '@/app/(main)/components/switch/configurator/story';
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
      switchWithoutDescriptiveLabel: switchWithoutDescriptiveLabelA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-switch'],
} satisfies ComponentDocsMeta<'p-switch'>;
