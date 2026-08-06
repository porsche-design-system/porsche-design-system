import { componentMeta } from '@porsche-design-system/component-meta';
import { inputDateExampleForm } from '@porsche-design-system/shared/examples';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/input-date/accessibility/examples/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@/app/(main)/components/input-date/accessibility/examples/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/input-date/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/input-date/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-date/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-date/configurator/introduction.mdx';
import { inputDateSlotStories, inputDateStory } from '@/app/(main)/components/input-date/configurator/story';
import FormDescription from '@/app/(main)/components/input-date/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-date/examples/slots/example.mdx';
import { inputDateStorySlots } from '@/app/(main)/components/input-date/examples/slots/story';
import Usage from '@/app/(main)/components/input-date/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputDateMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputDateStory,
    slotStories: inputDateSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputDateExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputDateStorySlots,
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
  api: componentMeta['p-input-date'],
} satisfies ComponentDocsMeta<'p-input-date'>;
