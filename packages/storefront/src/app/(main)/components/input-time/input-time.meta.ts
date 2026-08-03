import { componentMeta } from '@porsche-design-system/component-meta';
import { inputTimeExampleForm } from '@porsche-design-system/shared/examples';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/input-time/accessibility/examples/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@/app/(main)/components/input-time/accessibility/examples/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/input-time/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/input-time/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-time/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-time/configurator/introduction.mdx';
import { inputTimeSlotStories, inputTimeStory } from '@/app/(main)/components/input-time/configurator/story';
import FormDescription from '@/app/(main)/components/input-time/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-time/examples/slots/example.mdx';
import { inputTimeStorySlots } from '@/app/(main)/components/input-time/examples/slots/story';
import Usage from '@/app/(main)/components/input-time/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputTimeMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputTimeStory,
    slotStories: inputTimeSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputTimeExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputTimeStorySlots,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      placeholderUsedAsTheOnlyLabel: placeholderUsedAsTheOnlyLabelA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-time'],
} satisfies ComponentDocsMeta<'p-input-time'>;
