import { componentMeta } from '@porsche-design-system/component-meta';
import { inputTextExampleControlled, inputTextExampleForm } from '@porsche-design-system/examples-framework';
import ControlledDescription from '@porsche-design-system/examples-framework/components/input-text/controlled/example.mdx';
import FormDescription from '@porsche-design-system/examples-framework/components/input-text/form/example.mdx';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/input-text/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/input-text/accessibility/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@porsche-design-system/examples-stories/components/input-text/accessibility/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-stories/components/input-text/accessibility/validation-feedback-via-state-and-message-api/example';
import {
  inputTextSlotStories,
  inputTextStory,
} from '@porsche-design-system/examples-stories/components/input-text/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/input-text/slots/example.mdx';
import { inputTextStorySlots } from '@porsche-design-system/examples-stories/components/input-text/slots/story';
import AccessibilityOverview from '@/app/(main)/components/input-text/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-text/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-text/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-text/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputTextMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputTextStory,
    slotStories: inputTextSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputTextExampleForm,
    },
    controlled: {
      kind: 'example',
      name: 'Controlled Input (Preventing User Input)',
      description: ControlledDescription,
      example: inputTextExampleControlled,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputTextStorySlots,
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
  api: componentMeta['p-input-text'],
} satisfies ComponentDocsMeta<'p-input-text'>;
