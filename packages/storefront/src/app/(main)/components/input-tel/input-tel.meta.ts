import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/input-tel/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/input-tel/accessibility/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@porsche-design-system/examples-accessibility/components/input-tel/accessibility/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-accessibility/components/input-tel/accessibility/validation-feedback-via-state-and-message-api/example';
import { inputTelExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/input-tel/form/example.mdx';
import {
  inputTelSlotStories,
  inputTelStory,
} from '@porsche-design-system/examples-stories/components/input-tel/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/input-tel/slots/example.mdx';
import { inputTelStorySlots } from '@porsche-design-system/examples-stories/components/input-tel/slots/story';
import AccessibilityOverview from '@/app/(main)/components/input-tel/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-tel/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-tel/configurator/introduction.mdx';
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
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      placeholderUsedAsTheOnlyLabel: placeholderUsedAsTheOnlyLabelA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-tel'],
} satisfies ComponentDocsMeta<'p-input-tel'>;
