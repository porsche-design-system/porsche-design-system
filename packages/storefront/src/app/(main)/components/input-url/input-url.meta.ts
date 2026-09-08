import { componentMeta } from '@porsche-design-system/component-meta';
import { inputUrlExampleForm } from '@porsche-design-system/shared/examples';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/input-url/accessibility/examples/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@/app/(main)/components/input-url/accessibility/examples/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/input-url/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/input-url/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-url/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-url/configurator/introduction.mdx';
import { inputUrlSlotStories, inputUrlStory } from '@/app/(main)/components/input-url/configurator/story';
import FormDescription from '@/app/(main)/components/input-url/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-url/examples/slots/example.mdx';
import { inputUrlStorySlots } from '@/app/(main)/components/input-url/examples/slots/story';
import Usage from '@/app/(main)/components/input-url/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputUrlMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputUrlStory,
    slotStories: inputUrlSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputUrlExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputUrlStorySlots,
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
  api: componentMeta['p-input-url'],
} satisfies ComponentDocsMeta<'p-input-url'>;
