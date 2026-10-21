import { componentMeta } from '@porsche-design-system/component-meta';
import { segmentedControlExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/segmented-control/form/example.mdx';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/segmented-control/accessibility/hidden-label-without-accessible-name/example';
import { missingGroupLabelA11yExample } from '@porsche-design-system/examples-stories/components/segmented-control/accessibility/missing-group-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-stories/components/segmented-control/accessibility/validation-feedback-via-state-and-message-api/example';
import {
  segmentedControlSlotStories,
  segmentedControlStory,
} from '@porsche-design-system/examples-stories/components/segmented-control/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/segmented-control/slots/example.mdx';
import { segmentedControlStorySlots } from '@porsche-design-system/examples-stories/components/segmented-control/slots/story';
import WithLabelsDescription from '@porsche-design-system/examples-stories/components/segmented-control/with-labels/example.mdx';
import { segmentedControlStoryLabel } from '@porsche-design-system/examples-stories/components/segmented-control/with-labels/story';
import AccessibilityOverview from '@/app/(main)/components/segmented-control/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/segmented-control/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/segmented-control/configurator/introduction.mdx';
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
