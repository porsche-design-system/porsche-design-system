import { componentMeta } from '@porsche-design-system/component-meta';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/pin-code/accessibility/hidden-label-without-accessible-name/example';
import { missingFieldLabelA11yExample } from '@porsche-design-system/examples-accessibility/components/pin-code/accessibility/missing-field-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-accessibility/components/pin-code/accessibility/validation-feedback-via-state-and-message-api/example';
import { pinCodeExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/pin-code/form/example.mdx';
import CopyPasteDescription from '@porsche-design-system/examples-stories/components/pin-code/copy-paste/example.mdx';
import {
  pinCodeSlotStories,
  pinCodeStory,
} from '@porsche-design-system/examples-stories/components/pin-code/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/pin-code/slots/example.mdx';
import { pinCodeStorySlots } from '@porsche-design-system/examples-stories/components/pin-code/slots/story';
import AccessibilityOverview from '@/app/(main)/components/pin-code/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/pin-code/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/pin-code/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/pin-code/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const pinCodeMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: pinCodeStory,
    slotStories: pinCodeSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: pinCodeExampleForm,
    },
    copyPaste: {
      kind: 'story',
      name: 'Copy+Paste and autocomplete',
      description: CopyPasteDescription,
      story: pinCodeStory,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: pinCodeStorySlots,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      missingFieldLabel: missingFieldLabelA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-pin-code'],
} satisfies ComponentDocsMeta<'p-pin-code'>;
