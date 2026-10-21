import { componentMeta } from '@porsche-design-system/component-meta';
import { textareaExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/textarea/form/example.mdx';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/textarea/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/textarea/accessibility/hidden-label-without-accessible-name/example';
import { placeholderOnlyInstructionsForOpenTextInputA11yExample } from '@porsche-design-system/examples-stories/components/textarea/accessibility/placeholder-only-instructions-for-open-text-input/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-stories/components/textarea/accessibility/validation-feedback-via-state-and-message-api/example';
import {
  textareaSlotStories,
  textareaStory,
} from '@porsche-design-system/examples-stories/components/textarea/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/textarea/slots/example.mdx';
import { textareaStorySlots } from '@porsche-design-system/examples-stories/components/textarea/slots/story';
import AccessibilityOverview from '@/app/(main)/components/textarea/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/textarea/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/textarea/configurator/introduction.mdx';
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
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      placeholderOnlyInstructionsForOpenTextInput: placeholderOnlyInstructionsForOpenTextInputA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-textarea'],
} satisfies ComponentDocsMeta<'p-textarea'>;
