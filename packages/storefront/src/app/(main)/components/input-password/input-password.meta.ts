import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/input-password/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/input-password/accessibility/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@porsche-design-system/examples-accessibility/components/input-password/accessibility/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-accessibility/components/input-password/accessibility/validation-feedback-via-state-and-message-api/example';
import { inputPasswordExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/input-password/form/example.mdx';
import {
  inputPasswordSlotStories,
  inputPasswordStory,
} from '@porsche-design-system/examples-stories/components/input-password/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/input-password/slots/example.mdx';
import { inputPasswordStorySlots } from '@porsche-design-system/examples-stories/components/input-password/slots/story';
import ToggleDescription from '@porsche-design-system/examples-stories/components/input-password/toggle/example.mdx';
import { inputPasswordStoryToggle } from '@porsche-design-system/examples-stories/components/input-password/toggle/story';
import AccessibilityOverview from '@/app/(main)/components/input-password/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-password/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-password/configurator/introduction.mdx';
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
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      placeholderUsedAsTheOnlyLabel: placeholderUsedAsTheOnlyLabelA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-password'],
} satisfies ComponentDocsMeta<'p-input-password'>;
