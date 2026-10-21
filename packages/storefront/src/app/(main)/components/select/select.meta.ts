import { componentMeta } from '@porsche-design-system/component-meta';
import {
  selectExampleAsyncFilter,
  selectExampleDynamic,
  selectExampleForm,
  selectExampleRequired,
  selectExampleSelectedSlot,
} from '@porsche-design-system/examples-framework';
import AsyncFilterDescription from '@porsche-design-system/examples-framework/components/select/async-filter/example.mdx';
import FormDescription from '@porsche-design-system/examples-framework/components/select/form/example.mdx';
import RequiredDescription from '@porsche-design-system/examples-framework/components/select/required/example.mdx';
import SelectedSlotDescription from '@porsche-design-system/examples-framework/components/select/selected-slot/example.mdx';
import SetValueDescription from '@porsche-design-system/examples-framework/components/select/set-value/example.mdx';
import { ambiguousOptionLabelsWithoutFieldContextA11yExample } from '@porsche-design-system/examples-stories/components/select/accessibility/ambiguous-option-labels-without-field-context/example';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/select/accessibility/aria-on-component-host-vs-aria-prop/example';
import { errorStateWithoutRecoveryGuidanceA11yExample } from '@porsche-design-system/examples-stories/components/select/accessibility/error-state-without-recovery-guidance/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/select/accessibility/hidden-label-without-accessible-name/example';
import { promptOptionUsedInsteadOfALabelA11yExample } from '@porsche-design-system/examples-stories/components/select/accessibility/prompt-option-used-instead-of-a-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-stories/components/select/accessibility/validation-feedback-via-state-and-message-api/example';
import {
  selectSlotStories,
  selectStory,
} from '@porsche-design-system/examples-stories/components/select/default/story';
import OptgroupsDescription from '@porsche-design-system/examples-stories/components/select/optgroups/example.mdx';
import { selectStoryOptgroups } from '@porsche-design-system/examples-stories/components/select/optgroups/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/select/slots/example.mdx';
import { selectStorySlots } from '@porsche-design-system/examples-stories/components/select/slots/story';
import SlottedImagesDescription from '@porsche-design-system/examples-stories/components/select/slotted-images/example.mdx';
import { selectStorySlottedImages } from '@porsche-design-system/examples-stories/components/select/slotted-images/story';
import AccessibilityOverview from '@/app/(main)/components/select/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/select/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/select/configurator/introduction.mdx';
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
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
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
