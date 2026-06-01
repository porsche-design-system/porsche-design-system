import { componentMeta } from '@porsche-design-system/component-meta';
import { buttonTileExampleHyphens } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/components/button-tile/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/button-tile/configurator/introduction.mdx';
import { buttonTileSlotStory, buttonTileStory } from '@/app/components/button-tile/configurator/story';
import FooterSlotDescription from '@/app/components/button-tile/examples/footer-slot/example.mdx';
import { buttonTileStoryFooterSlot } from '@/app/components/button-tile/examples/footer-slot/story';
import HyphensDescription from '@/app/components/button-tile/examples/hyphens/example.mdx';
import UiBehaviourDescription from '@/app/components/button-tile/examples/ui-behaviour/example.mdx';
import { buttonTileStoryGrid } from '@/app/components/button-tile/examples/ui-behaviour/story';
import Usage from '@/app/components/button-tile/usage/page.mdx';
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
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-button-tile'],
} satisfies ComponentDocsMeta<'p-button-tile'>;

