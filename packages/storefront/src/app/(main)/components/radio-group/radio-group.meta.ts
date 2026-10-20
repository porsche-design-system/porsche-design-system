import { componentMeta } from '@porsche-design-system/component-meta';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/radio-group/accessibility/hidden-label-without-accessible-name/example';
import { missingGroupLabelA11yExample } from '@porsche-design-system/examples-accessibility/components/radio-group/accessibility/missing-group-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-accessibility/components/radio-group/accessibility/validation-feedback-via-state-and-message-api/example';
import { radioGroupExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/radio-group/form/example.mdx';
import {
  radioGroupSlotStories,
  radioGroupStory,
} from '@porsche-design-system/examples-stories/components/radio-group/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/radio-group/slots/example.mdx';
import { radioGroupStorySlots } from '@porsche-design-system/examples-stories/components/radio-group/slots/story';
import AccessibilityOverview from '@/app/(main)/components/radio-group/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/radio-group/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/radio-group/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/radio-group/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const radioGroupMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: radioGroupStory,
    slotStories: radioGroupSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: radioGroupExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: radioGroupStorySlots,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      missingGroupLabel: missingGroupLabelA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-radio-group'],
} satisfies ComponentDocsMeta<'p-radio-group'>;
