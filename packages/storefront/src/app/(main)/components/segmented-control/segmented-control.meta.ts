import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/segmented-control/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/segmented-control/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/segmented-control/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/segmented-control/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const segmentedControlMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/segmented-control/default',
  examples: [
    'components/segmented-control/form',
    'components/segmented-control/with-labels',
    'components/segmented-control/slots',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/segmented-control/accessibility/missing-group-label',
      'components/segmented-control/accessibility/hidden-label-without-accessible-name',
      'components/segmented-control/accessibility/validation-feedback-via-state-and-message-api',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-segmented-control'],
} satisfies ComponentDocsMeta<'p-segmented-control'>;
