import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/popover/accessibility/aria-on-component-host-vs-aria-prop/example';
import { customSlottedTriggerWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/popover/accessibility/custom-slotted-trigger-without-accessible-name/example';
import { customSlottedTriggerWithoutAriaExpandedA11yExample } from '@porsche-design-system/examples-accessibility/components/popover/accessibility/custom-slotted-trigger-without-aria-expanded/example';
import {
  popoverControlledSlotStories,
  popoverControlledStory,
  popoverSlotStories,
  popoverStory,
} from '@porsche-design-system/examples-stories/components/popover/default/story';
import SlottedButtonDescription from '@porsche-design-system/examples-stories/components/popover/slotted-button/example.mdx';
import { popoverSlottedButtonStory } from '@porsche-design-system/examples-stories/components/popover/slotted-button/story';
import AccessibilityOverview from '@/app/(main)/components/popover/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/popover/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/popover/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/popover/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const popoverMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: popoverStory,
    slotStories: popoverSlotStories,
    controlledStory: popoverControlledStory,
    controlledSlotStories: popoverControlledSlotStories,
  },
  examples: {
    slottedButton: {
      kind: 'story',
      name: 'Slotted button',
      description: SlottedButtonDescription,
      story: popoverSlottedButtonStory,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      customSlottedTriggerWithoutAccessibleName: customSlottedTriggerWithoutAccessibleNameA11yExample,
      customSlottedTriggerWithoutAriaExpanded: customSlottedTriggerWithoutAriaExpandedA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-popover'],
} satisfies ComponentDocsMeta<'p-popover'>;
