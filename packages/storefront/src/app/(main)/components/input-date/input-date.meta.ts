import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/input-date/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/input-date/accessibility/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@porsche-design-system/examples-accessibility/components/input-date/accessibility/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-accessibility/components/input-date/accessibility/validation-feedback-via-state-and-message-api/example';
import { inputDateExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/input-date/form/example.mdx';
import {
  inputDateSlotStories,
  inputDateStory,
} from '@porsche-design-system/examples-stories/components/input-date/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/input-date/slots/example.mdx';
import { inputDateStorySlots } from '@porsche-design-system/examples-stories/components/input-date/slots/story';
import AccessibilityOverview from '@/app/(main)/components/input-date/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-date/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-date/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-date/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputDateMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputDateStory,
    slotStories: inputDateSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputDateExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputDateStorySlots,
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
  api: componentMeta['p-input-date'],
} satisfies ComponentDocsMeta<'p-input-date'>;
