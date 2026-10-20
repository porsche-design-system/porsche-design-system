import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/input-search/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/input-search/accessibility/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@porsche-design-system/examples-accessibility/components/input-search/accessibility/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-accessibility/components/input-search/accessibility/validation-feedback-via-state-and-message-api/example';
import { inputSearchExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/input-search/form/example.mdx';
import AriaComboboxDescription from '@porsche-design-system/examples-stories/components/input-search/aria-combobox/example.mdx';
import { inputSearchStoryAriaComboboxSketch } from '@porsche-design-system/examples-stories/components/input-search/aria-combobox/story';
import {
  inputSearchSlotStories,
  inputSearchStory,
} from '@porsche-design-system/examples-stories/components/input-search/default/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/input-search/slots/example.mdx';
import { inputSearchStorySlots } from '@porsche-design-system/examples-stories/components/input-search/slots/story';
import AccessibilityOverview from '@/app/(main)/components/input-search/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-search/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-search/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/input-search/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputSearchMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputSearchStory,
    slotStories: inputSearchSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputSearchExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputSearchStorySlots,
    },
    ariaCombobox: {
      kind: 'story',
      name: 'Used as a Combobox',
      description: AriaComboboxDescription,
      story: inputSearchStoryAriaComboboxSketch,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      placeholderUsedAsTheOnlyLabel: placeholderUsedAsTheOnlyLabelA11yExample,
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-input-search'],
} satisfies ComponentDocsMeta<'p-input-search'>;
