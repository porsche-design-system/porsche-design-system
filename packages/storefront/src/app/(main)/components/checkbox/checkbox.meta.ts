import { componentMeta } from '@porsche-design-system/component-meta';
import { checkboxExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/checkbox/form/example.mdx';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/checkbox/accessibility/aria-on-component-host-vs-aria-prop/example';
import { hiddenLabelWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/checkbox/accessibility/hidden-label-without-accessible-name/example';
import { validationFeedbackViaStateAndMessageApiA11yExample } from '@porsche-design-system/examples-stories/components/checkbox/accessibility/validation-feedback-via-state-and-message-api/example';
import {
  checkboxSlotStories,
  checkboxStory,
} from '@porsche-design-system/examples-stories/components/checkbox/default/story';
import IndeterminateDescription from '@porsche-design-system/examples-stories/components/checkbox/indeterminate/example.mdx';
import { checkboxStoryIndeterminate } from '@porsche-design-system/examples-stories/components/checkbox/indeterminate/story';
import SlotsDescription from '@porsche-design-system/examples-stories/components/checkbox/slots/example.mdx';
import { checkboxStorySlots } from '@porsche-design-system/examples-stories/components/checkbox/slots/story';
import WrappedLabelDescription from '@porsche-design-system/examples-stories/components/checkbox/wrapped-label/example.mdx';
import { checkboxStoryWrappedLabel } from '@porsche-design-system/examples-stories/components/checkbox/wrapped-label/story';
import AccessibilityOverview from '@/app/(main)/components/checkbox/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/checkbox/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/checkbox/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/checkbox/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const checkboxMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: checkboxStory,
    slotStories: checkboxSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: checkboxExampleForm,
    },
    indeterminate: {
      kind: 'story',
      name: 'Indeterminate',
      description: IndeterminateDescription,
      story: checkboxStoryIndeterminate,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: checkboxStorySlots,
    },
    wrappedLabel: {
      kind: 'story',
      name: 'Custom wrapped label (🧪Experimental)',
      description: WrappedLabelDescription,
      story: checkboxStoryWrappedLabel,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      hiddenLabelWithoutAccessibleName: hiddenLabelWithoutAccessibleNameA11yExample,
      validationFeedbackViaStateAndMessageApi: validationFeedbackViaStateAndMessageApiA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-checkbox'],
} satisfies ComponentDocsMeta<'p-checkbox'>;
