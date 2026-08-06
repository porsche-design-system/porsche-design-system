import { componentMeta } from '@porsche-design-system/component-meta';
import { inputPasswordExampleForm } from '@porsche-design-system/shared/examples';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/input-password/accessibility/examples/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@/app/(main)/components/input-password/accessibility/examples/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/input-password/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/input-password/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-password/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-password/configurator/introduction.mdx';
import {
  inputPasswordSlotStories,
  inputPasswordStory,
} from '@/app/(main)/components/input-password/configurator/story';
import FormDescription from '@/app/(main)/components/input-password/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-password/examples/slots/example.mdx';
import { inputPasswordStorySlots } from '@/app/(main)/components/input-password/examples/slots/story';
import ToggleDescription from '@/app/(main)/components/input-password/examples/toggle/example.mdx';
import { inputPasswordStoryToggle } from '@/app/(main)/components/input-password/examples/toggle/story';
import Usage from '@/app/(main)/components/input-password/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputPasswordMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputPasswordStory,
    slotStories: inputPasswordSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputPasswordExampleForm,
    },
    toggle: {
      kind: 'story',
      name: 'Show password toggle button',
      description: ToggleDescription,
      story: inputPasswordStoryToggle,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputPasswordStorySlots,
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
  api: componentMeta['p-input-password'],
} satisfies ComponentDocsMeta<'p-input-password'>;
