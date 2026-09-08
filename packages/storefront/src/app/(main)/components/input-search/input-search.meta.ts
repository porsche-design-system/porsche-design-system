import { componentMeta } from '@porsche-design-system/component-meta';
import { inputSearchExampleForm } from '@porsche-design-system/shared/examples';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@/app/(main)/components/input-search/accessibility/examples/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@/app/(main)/components/input-search/accessibility/examples/hidden-label-without-accessible-name/example';
import { placeholderUsedAsTheOnlyLabelA11yExample } from '@/app/(main)/components/input-search/accessibility/examples/placeholder-used-as-the-only-label/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@/app/(main)/components/input-search/accessibility/examples/validation-feedback-via-state-and-message-api/example';
import AccessibilityOverview from '@/app/(main)/components/input-search/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/input-search/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/input-search/configurator/introduction.mdx';
import { inputSearchSlotStories, inputSearchStory } from '@/app/(main)/components/input-search/configurator/story';
import AriaComboboxDescription from '@/app/(main)/components/input-search/examples/aria-combobox/example.mdx';
import { inputSearchStoryAriaComboboxSketch } from '@/app/(main)/components/input-search/examples/aria-combobox/story';
import FormDescription from '@/app/(main)/components/input-search/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-search/examples/slots/example.mdx';
import { inputSearchStorySlots } from '@/app/(main)/components/input-search/examples/slots/story';
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
