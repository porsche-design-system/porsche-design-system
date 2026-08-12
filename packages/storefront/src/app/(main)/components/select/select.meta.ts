import { componentMeta } from '@porsche-design-system/component-meta';
import {
  selectExampleAsyncFilter,
  selectExampleDynamic,
  selectExampleForm,
  selectExampleRequired,
  selectExampleSelectedSlot,
} from '@porsche-design-system/shared/examples';
import { ambiguousOptionLabelsWithoutFieldContextA11yExample } from '@/app/(main)/components/select/accessibility/examples/ambiguous-option-labels-without-field-context/example';
import { errorStateWithoutRecoveryGuidanceA11yExample } from '@/app/(main)/components/select/accessibility/examples/error-state-without-recovery-guidance/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/select/accessibility/examples/hidden-label-without-accessible-name/example';
import { promptOptionUsedInsteadOfALabelA11yExample } from '@/app/(main)/components/select/accessibility/examples/prompt-option-used-instead-of-a-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/select/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/select/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/select/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/select/configurator/introduction.mdx';
import { selectSlotStories, selectStory } from '@/app/(main)/components/select/configurator/story';
import AsyncFilterDescription from '@/app/(main)/components/select/examples/async-filter/example.mdx';
import FormDescription from '@/app/(main)/components/select/examples/form/example.mdx';
import OptgroupsDescription from '@/app/(main)/components/select/examples/optgroups/example.mdx';
import { selectStoryOptgroups } from '@/app/(main)/components/select/examples/optgroups/story';
import RequiredDescription from '@/app/(main)/components/select/examples/required/example.mdx';
import SelectedSlotDescription from '@/app/(main)/components/select/examples/selected-slot/example.mdx';
import SetValueDescription from '@/app/(main)/components/select/examples/set-value/example.mdx';
import SlotsDescription from '@/app/(main)/components/select/examples/slots/example.mdx';
import { selectStorySlots } from '@/app/(main)/components/select/examples/slots/story';
import SlottedImagesDescription from '@/app/(main)/components/select/examples/slotted-images/example.mdx';
import { selectStorySlottedImages } from '@/app/(main)/components/select/examples/slotted-images/story';
import Usage from '@/app/(main)/components/select/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const selectMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: selectStory,
    slotStories: selectSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: selectExampleForm,
    },
    required: {
      kind: 'example',
      name: 'Basic example without preselection',
      description: RequiredDescription,
      example: selectExampleRequired,
    },
    slottedImages: {
      kind: 'story',
      name: 'Slotted images',
      description: SlottedImagesDescription,
      story: selectStorySlottedImages,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: selectStorySlots,
    },
    setValue: {
      kind: 'example',
      name: 'Set Value',
      description: SetValueDescription,
      example: selectExampleDynamic,
    },
    optgroups: {
      kind: 'story',
      name: 'With optgroups',
      description: OptgroupsDescription,
      story: selectStoryOptgroups,
    },
    asyncFilter: {
      kind: 'example',
      name: 'Custom asynchronous filtering',
      description: AsyncFilterDescription,
      example: selectExampleAsyncFilter,
    },
    selectedSlot: {
      kind: 'example',
      name: 'Custom option rendering',
      description: SelectedSlotDescription,
      example: selectExampleSelectedSlot,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      promptOptionUsedInsteadOfALabel: promptOptionUsedInsteadOfALabelA11yExample,
      ambiguousOptionLabelsWithoutFieldContext: ambiguousOptionLabelsWithoutFieldContextA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
      errorStateWithoutRecoveryGuidance: errorStateWithoutRecoveryGuidanceA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-select'],
} satisfies ComponentDocsMeta<'p-select'>;
