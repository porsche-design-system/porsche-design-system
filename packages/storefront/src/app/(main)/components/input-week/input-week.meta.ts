import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/input-week/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/input-week/accessibility/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@porsche-design-system/examples-accessibility/components/input-week/accessibility/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-accessibility/components/input-week/accessibility/validation-feedback-via-state-and-message-api/example';
import { inputWeekExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/input-week/form/example.mdx';
import {
  inputWeekSlotStories,
  inputWeekStory,
} from '@porsche-design-system/examples-stories/components/input-week/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/input-week/slots/example.mdx';
import { inputWeekStorySlots } from '@porsche-design-system/examples-stories/components/input-week/slots/story';
import AccessibilityOverview from '@/app/(main)/components/input-week/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-week/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-week/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-week/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputWeekMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputWeekStory,
    slotStories: inputWeekSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputWeekExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputWeekStorySlots,
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
  api: componentMeta['p-input-week'],
} satisfies ComponentDocsMeta<'p-input-week'>;
