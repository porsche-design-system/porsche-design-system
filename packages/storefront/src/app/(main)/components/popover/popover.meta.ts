import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@/app/(main)/components/popover/accessibility/examples/aria-on-component-host-vs-aria-prop/example';
import { customSlottedTriggerWithoutAccessibleNameA11yExample } from '@/app/(main)/components/popover/accessibility/examples/custom-slotted-trigger-without-accessible-name/example';
import { customSlottedTriggerWithoutAriaExpandedA11yExample } from '@/app/(main)/components/popover/accessibility/examples/custom-slotted-trigger-without-aria-expanded/example';
import AccessibilityOverview from '@/app/(main)/components/popover/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/popover/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/popover/configurator/introduction.mdx';
import {
  popoverControlledSlotStories,
  popoverControlledStory,
  popoverSlotStories,
  popoverStory,
} from '@/app/(main)/components/popover/configurator/story';
import SlottedButtonDescription from '@/app/(main)/components/popover/examples/slotted-button/example.mdx';
import { popoverSlottedButtonStory } from '@/app/(main)/components/popover/examples/slotted-button/story';
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
