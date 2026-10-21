import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/modal/accessibility/aria-on-component-host-vs-aria-prop/example';
import { dialogLabelOnComponentHostVsHeaderSlotA11yExample } from '@porsche-design-system/examples-stories/components/modal/accessibility/dialog-label-on-component-host-vs-header-slot/example';
import { modalTriggerWithoutPopupSemanticsOrContextA11yExample } from '@porsche-design-system/examples-stories/components/modal/accessibility/modal-trigger-without-popup-semantics-or-context/example';
import AlertDialogDescription from '@porsche-design-system/examples-stories/components/modal/alert-dialog/example.mdx';
import { modalStoryAlertDialog } from '@porsche-design-system/examples-stories/components/modal/alert-dialog/story';
import CustomStylingDescription from '@porsche-design-system/examples-stories/components/modal/custom-styling/example.mdx';
import { modalStoryCustomStyling } from '@porsche-design-system/examples-stories/components/modal/custom-styling/story';
import { modalSlotStories, modalStory } from '@porsche-design-system/examples-stories/components/modal/default/story';
import ScrollableDescription from '@porsche-design-system/examples-stories/components/modal/scrollable/example.mdx';
import { modalStoryScrollable } from '@porsche-design-system/examples-stories/components/modal/scrollable/story';
import AccessibilityOverview from '@/app/(main)/components/modal/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/modal/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/modal/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/modal/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const modalMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: modalStory,
    slotStories: modalSlotStories,
  },
  examples: {
    scrollable: {
      kind: 'story',
      name: 'Scrollable modal with sticky footer',
      description: ScrollableDescription,
      story: modalStoryScrollable,
    },
    alertDialog: {
      kind: 'story',
      name: 'Modal as alert dialog',
      description: AlertDialogDescription,
      story: modalStoryAlertDialog,
    },
    customStyling: {
      kind: 'story',
      name: 'Custom styling',
      description: CustomStylingDescription,
      story: modalStoryCustomStyling,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      dialogLabelOnComponentHostVsHeaderSlot: dialogLabelOnComponentHostVsHeaderSlotA11yExample,
      modalTriggerWithoutPopupSemanticsOrContext: modalTriggerWithoutPopupSemanticsOrContextA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-modal'],
} satisfies ComponentDocsMeta<'p-modal'>;
