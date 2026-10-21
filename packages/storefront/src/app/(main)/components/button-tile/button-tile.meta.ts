import { componentMeta } from '@porsche-design-system/component-meta';
import { buttonTileExampleHyphens } from '@porsche-design-system/examples-framework';
import HyphensDescription from '@porsche-design-system/examples-framework/components/button-tile/hyphens/example.mdx';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/button-tile/accessibility/aria-on-component-host-vs-aria-prop/example';
import { vagueTileLabelWithoutContextA11yExample } from '@porsche-design-system/examples-stories/components/button-tile/accessibility/vague-tile-label-without-context/example';
import ColorSchemeDescription from '@porsche-design-system/examples-stories/components/button-tile/color-scheme/example.mdx';
import { buttonTileStoryColorScheme } from '@porsche-design-system/examples-stories/components/button-tile/color-scheme/story';
import {
  buttonTileSlotStory,
  buttonTileStory,
} from '@porsche-design-system/examples-stories/components/button-tile/default/story';
import FooterSlotDescription from '@porsche-design-system/examples-stories/components/button-tile/footer-slot/example.mdx';
import { buttonTileStoryFooterSlot } from '@porsche-design-system/examples-stories/components/button-tile/footer-slot/story';
import UiBehaviourDescription from '@porsche-design-system/examples-stories/components/button-tile/ui-behaviour/example.mdx';
import { buttonTileStoryGrid } from '@porsche-design-system/examples-stories/components/button-tile/ui-behaviour/story';
import AccessibilityOverview from '@/app/(main)/components/button-tile/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/button-tile/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/button-tile/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/button-tile/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const buttonTileMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: buttonTileStory,
    slotStories: buttonTileSlotStory,
  },
  examples: {
    uiBehaviour: {
      kind: 'story',
      name: 'UI behaviour',
      description: UiBehaviourDescription,
      story: buttonTileStoryGrid,
    },
    hyphens: {
      kind: 'example',
      name: 'Hyphens',
      description: HyphensDescription,
      example: buttonTileExampleHyphens,
    },
    footerSlot: {
      kind: 'story',
      name: 'Footer slot',
      description: FooterSlotDescription,
      story: buttonTileStoryFooterSlot,
    },
    colorScheme: {
      kind: 'story',
      name: 'Color scheme',
      description: ColorSchemeDescription,
      story: buttonTileStoryColorScheme,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      vagueTileLabelWithoutContext: vagueTileLabelWithoutContextA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-button-tile'],
} satisfies ComponentDocsMeta<'p-button-tile'>;
