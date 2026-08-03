import { componentMeta } from '@porsche-design-system/component-meta';
import { inputWeekExampleForm } from '@porsche-design-system/shared/examples';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/input-week/accessibility/examples/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@/app/(main)/components/input-week/accessibility/examples/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/input-week/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/input-week/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-week/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-week/configurator/introduction.mdx';
import { inputWeekSlotStories, inputWeekStory } from '@/app/(main)/components/input-week/configurator/story';
import FormDescription from '@/app/(main)/components/input-week/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-week/examples/slots/example.mdx';
import { inputWeekStorySlots } from '@/app/(main)/components/input-week/examples/slots/story';
import Usage from '@/app/(main)/components/input-week/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputWeekMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputWeekStory,
    slotStories: inputWeekSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputWeekExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputWeekStorySlots,
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
  api: componentMeta['p-input-week'],
} satisfies ComponentDocsMeta<'p-input-week'>;
