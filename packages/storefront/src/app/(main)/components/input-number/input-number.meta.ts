import { componentMeta } from '@porsche-design-system/component-meta';
import { inputNumberExampleForm } from '@porsche-design-system/shared/examples';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/input-number/accessibility/examples/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@/app/(main)/components/input-number/accessibility/examples/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/input-number/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/input-number/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-number/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-number/configurator/introduction.mdx';
import { inputNumberSlotStories, inputNumberStory } from '@/app/(main)/components/input-number/configurator/story';
import FormDescription from '@/app/(main)/components/input-number/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-number/examples/slots/example.mdx';
import { inputNumberStorySlots } from '@/app/(main)/components/input-number/examples/slots/story';
import Usage from '@/app/(main)/components/input-number/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputNumberMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputNumberStory,
    slotStories: inputNumberSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputNumberExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputNumberStorySlots,
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
  api: componentMeta['p-input-number'],
} satisfies ComponentDocsMeta<'p-input-number'>;
