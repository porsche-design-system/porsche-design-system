import { componentMeta } from '@porsche-design-system/component-meta';
import { inputTelExampleForm } from '@porsche-design-system/shared/examples';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/input-tel/accessibility/examples/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@/app/(main)/components/input-tel/accessibility/examples/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/input-tel/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/input-tel/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-tel/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-tel/configurator/introduction.mdx';
import { inputTelSlotStories, inputTelStory } from '@/app/(main)/components/input-tel/configurator/story';
import FormDescription from '@/app/(main)/components/input-tel/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-tel/examples/slots/example.mdx';
import { inputTelStorySlots } from '@/app/(main)/components/input-tel/examples/slots/story';
import Usage from '@/app/(main)/components/input-tel/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputTelMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputTelStory,
    slotStories: inputTelSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputTelExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputTelStorySlots,
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
  api: componentMeta['p-input-tel'],
} satisfies ComponentDocsMeta<'p-input-tel'>;
