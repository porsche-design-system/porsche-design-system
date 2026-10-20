import { componentMeta } from '@porsche-design-system/component-meta';
import { genericStepLabelsWithoutContextA11yExample } from '@porsche-design-system/examples-accessibility/components/stepper-horizontal/accessibility/generic-step-labels-without-context/example';
import { stepperHorizontalExample } from '@porsche-design-system/examples-framework';
import FrameworkImplementationDescription from '@porsche-design-system/examples-framework/components/stepper-horizontal/framework-implementation/example.mdx';
import { stepperHorizontalStory } from '@porsche-design-system/examples-stories/components/stepper-horizontal/default/story';
import AccessibilityOverview from '@/app/(main)/components/stepper-horizontal/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/stepper-horizontal/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/stepper-horizontal/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/stepper-horizontal/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const stepperHorizontalMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: stepperHorizontalStory,
  },
  examples: {
    frameworkImplementation: {
      kind: 'example',
      name: 'Framework Implementation',
      description: FrameworkImplementationDescription,
      example: stepperHorizontalExample,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      genericStepLabelsWithoutContext: genericStepLabelsWithoutContextA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-stepper-horizontal'],
} satisfies ComponentDocsMeta<'p-stepper-horizontal'>;
