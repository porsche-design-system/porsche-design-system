import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/stepper-horizontal/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/stepper-horizontal/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/stepper-horizontal/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/stepper-horizontal/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const stepperHorizontalMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/stepper-horizontal/default',
  examples: ['components/stepper-horizontal/framework-implementation'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: ['components/stepper-horizontal/accessibility/generic-step-labels-without-context'],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-stepper-horizontal'],
} satisfies ComponentDocsMeta<'p-stepper-horizontal'>;
