import { componentMeta } from '@porsche-design-system/component-meta';
import { textareaExampleForm } from '@porsche-design-system/shared/examples';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/textarea/accessibility/examples/hidden-label-without-accessible-name/example';
import { placeholderOnlyInstructionsForOpenTextInputA11yExample } from '@/app/(main)/components/textarea/accessibility/examples/placeholder-only-instructions-for-open-text-input/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/textarea/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/textarea/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/textarea/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/textarea/configurator/introduction.mdx';
import { textareaSlotStories, textareaStory } from '@/app/(main)/components/textarea/configurator/story';
import FormDescription from '@/app/(main)/components/textarea/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/textarea/examples/slots/example.mdx';
import { textareaStorySlots } from '@/app/(main)/components/textarea/examples/slots/story';
import Usage from '@/app/(main)/components/textarea/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const textareaMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: textareaStory,
    slotStories: textareaSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: textareaExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: textareaStorySlots,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      placeholderOnlyInstructionsForOpenTextInput: placeholderOnlyInstructionsForOpenTextInputA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-textarea'],
} satisfies ComponentDocsMeta<'p-textarea'>;
