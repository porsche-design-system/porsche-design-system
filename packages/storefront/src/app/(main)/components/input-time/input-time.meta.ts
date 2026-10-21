import { componentMeta } from '@porsche-design-system/component-meta';
import { inputTimeExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/input-time/form/example.mdx';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/input-time/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/input-time/accessibility/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@porsche-design-system/examples-stories/components/input-time/accessibility/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-stories/components/input-time/accessibility/validation-feedback-via-state-and-message-api/example';
import {
  inputTimeSlotStories,
  inputTimeStory,
} from '@porsche-design-system/examples-stories/components/input-time/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/input-time/slots/example.mdx';
import { inputTimeStorySlots } from '@porsche-design-system/examples-stories/components/input-time/slots/story';
import AccessibilityOverview from '@/app/(main)/components/input-time/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-time/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-time/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-time/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputTimeMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputTimeStory,
    slotStories: inputTimeSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputTimeExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputTimeStorySlots,
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
  api: componentMeta['p-input-time'],
} satisfies ComponentDocsMeta<'p-input-time'>;
