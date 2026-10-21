import { componentMeta } from '@porsche-design-system/component-meta';
import { inputEmailExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/input-email/form/example.mdx';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/input-email/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/input-email/accessibility/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@porsche-design-system/examples-stories/components/input-email/accessibility/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-stories/components/input-email/accessibility/validation-feedback-via-state-and-message-api/example';
import {
  inputEmailSlotStories,
  inputEmailStory,
} from '@porsche-design-system/examples-stories/components/input-email/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/input-email/slots/example.mdx';
import { inputEmailStorySlots } from '@porsche-design-system/examples-stories/components/input-email/slots/story';
import AccessibilityOverview from '@/app/(main)/components/input-email/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-email/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-email/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-email/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputEmailMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputEmailStory,
    slotStories: inputEmailSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputEmailExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputEmailStorySlots,
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
  api: componentMeta['p-input-email'],
} satisfies ComponentDocsMeta<'p-input-email'>;
