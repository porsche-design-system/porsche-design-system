import { componentMeta } from '@porsche-design-system/component-meta';
import { stepperHorizontalExample } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/stepper-horizontal/accessibility/page.mdx';
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
  accessibility: Accessibility,
  api: componentMeta['p-stepper-horizontal'],
} satisfies ComponentDocsMeta<'p-stepper-horizontal'>;

