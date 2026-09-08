import { componentMeta } from '@porsche-design-system/component-meta';
import { stepperHorizontalExample } from '@porsche-design-system/shared/examples';
import { genericStepLabelsWithoutContextA11yExample } from '@/app/(main)/components/stepper-horizontal/accessibility/examples/generic-step-labels-without-context/example';
import AccessibilityOverview from '@/app/(main)/components/stepper-horizontal/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/stepper-horizontal/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/stepper-horizontal/configurator/introduction.mdx';
import { stepperHorizontalStory } from '@/app/(main)/components/stepper-horizontal/configurator/story';
import FrameworkImplementationDescription from '@/app/(main)/components/stepper-horizontal/examples/framework-implementation/example.mdx';
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
