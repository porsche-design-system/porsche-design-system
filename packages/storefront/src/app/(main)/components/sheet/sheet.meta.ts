import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnTriggerButtonHostVsAriaPropA11yExample } from '@/app/(main)/components/sheet/accessibility/examples/aria-on-trigger-button-host-vs-aria-prop/example';
import { dialogLabelOnComponentHostVsHeaderSlotA11yExample } from '@/app/(main)/components/sheet/accessibility/examples/dialog-label-on-component-host-vs-header-slot/example';
import { sheetTriggerWithoutPopupSemanticsA11yExample } from '@/app/(main)/components/sheet/accessibility/examples/sheet-trigger-without-popup-semantics/example';
import AccessibilityOverview from '@/app/(main)/components/sheet/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/sheet/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/sheet/configurator/introduction.mdx';
import { sheetSlotStories, sheetStory } from '@/app/(main)/components/sheet/configurator/story';
import Usage from '@/app/(main)/components/sheet/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const sheetMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: sheetStory,
    slotStories: sheetSlotStories,
  },
  examples: {},
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnTriggerButtonHostVsAriaProp: ariaOnTriggerButtonHostVsAriaPropA11yExample,
      dialogLabelOnComponentHostVsHeaderSlot: dialogLabelOnComponentHostVsHeaderSlotA11yExample,
      sheetTriggerWithoutPopupSemantics: sheetTriggerWithoutPopupSemanticsA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-sheet'],
} satisfies ComponentDocsMeta<'p-sheet'>;
