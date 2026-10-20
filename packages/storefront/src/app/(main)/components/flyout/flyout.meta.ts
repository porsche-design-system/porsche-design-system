import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnTriggerButtonHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/flyout/accessibility/aria-on-trigger-button-host-vs-aria-prop/example';
import { dialogLabelOnComponentHostVsHeaderSlotA11yExample } from '@porsche-design-system/examples-accessibility/components/flyout/accessibility/dialog-label-on-component-host-vs-header-slot/example';
import { flyoutTriggerWithoutPopupSemanticsA11yExample } from '@porsche-design-system/examples-accessibility/components/flyout/accessibility/flyout-trigger-without-popup-semantics/example';
import { flyoutExampleForm } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/flyout/form/example.mdx';
import CustomStylingDescription from '@porsche-design-system/examples-stories/components/flyout/custom-styling/example.mdx';
import { flyoutStoryCustomStyling } from '@porsche-design-system/examples-stories/components/flyout/custom-styling/story';
import {
  flyoutSlotStories,
  flyoutStory,
} from '@porsche-design-system/examples-stories/components/flyout/default/story';
import StickyTopDescription from '@porsche-design-system/examples-stories/components/flyout/sticky-top/example.mdx';
import { flyoutStoryStickyTop } from '@porsche-design-system/examples-stories/components/flyout/sticky-top/story';
import AccessibilityOverview from '@/app/(main)/components/flyout/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/flyout/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/flyout/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/flyout/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const flyoutMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: flyoutStory,
    slotStories: flyoutSlotStories,
  },
  examples: {
    stickyTop: {
      kind: 'story',
      name: 'Sticky content with Custom CSS Property (Experimental)',
      description: StickyTopDescription,
      story: flyoutStoryStickyTop,
    },
    form: {
      kind: 'example',
      name: 'Flyout Form',
      description: FormDescription,
      example: flyoutExampleForm,
    },
    customStyling: {
      kind: 'story',
      name: 'Custom Styling',
      description: CustomStylingDescription,
      story: flyoutStoryCustomStyling,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnTriggerButtonHostVsAriaProp: ariaOnTriggerButtonHostVsAriaPropA11yExample,
      dialogLabelOnComponentHostVsHeaderSlot: dialogLabelOnComponentHostVsHeaderSlotA11yExample,
      flyoutTriggerWithoutPopupSemantics: flyoutTriggerWithoutPopupSemanticsA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-flyout'],
} satisfies ComponentDocsMeta<'p-flyout'>;
