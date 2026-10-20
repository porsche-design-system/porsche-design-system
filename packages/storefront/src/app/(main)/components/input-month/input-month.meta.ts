import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/input-month/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/input-month/accessibility/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@porsche-design-system/examples-accessibility/components/input-month/accessibility/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-accessibility/components/input-month/accessibility/validation-feedback-via-state-and-message-api/example';
import { inputMonthExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/input-month/form/example.mdx';
import {
  inputMonthSlotStories,
  inputMonthStory,
} from '@porsche-design-system/examples-stories/components/input-month/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/input-month/slots/example.mdx';
import { inputMonthStorySlots } from '@porsche-design-system/examples-stories/components/input-month/slots/story';
import AccessibilityOverview from '@/app/(main)/components/input-month/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-month/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-month/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-month/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputMonthMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputMonthStory,
    slotStories: inputMonthSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputMonthExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputMonthStorySlots,
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
  api: componentMeta['p-input-month'],
} satisfies ComponentDocsMeta<'p-input-month'>;
