import { componentMeta } from '@porsche-design-system/component-meta';
import { segmentedControlExampleForm } from '@porsche-design-system/shared/examples';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/segmented-control/accessibility/examples/hidden-label-without-accessible-name/example';
import { missingGroupLabelA11yExample } from '@/app/(main)/components/segmented-control/accessibility/examples/missing-group-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/segmented-control/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/segmented-control/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/segmented-control/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/segmented-control/configurator/introduction.mdx';
import {
  segmentedControlSlotStories,
  segmentedControlStory,
} from '@/app/(main)/components/segmented-control/configurator/story';
import FormDescription from '@/app/(main)/components/segmented-control/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/segmented-control/examples/slots/example.mdx';
import { segmentedControlStorySlots } from '@/app/(main)/components/segmented-control/examples/slots/story';
import WithLabelsDescription from '@/app/(main)/components/segmented-control/examples/with-labels/example.mdx';
import { segmentedControlStoryLabel } from '@/app/(main)/components/segmented-control/examples/with-labels/story';
import Usage from '@/app/(main)/components/segmented-control/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const segmentedControlMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: segmentedControlStory,
    slotStories: segmentedControlSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: segmentedControlExampleForm,
    },
    withLabels: {
      kind: 'story',
      name: 'With Labels',
      description: WithLabelsDescription,
      story: segmentedControlStoryLabel,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: segmentedControlStorySlots,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      missingGroupLabel: missingGroupLabelA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-segmented-control'],
} satisfies ComponentDocsMeta<'p-segmented-control'>;
