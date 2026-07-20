import { componentMeta } from '@porsche-design-system/component-meta';
import { linkTileExampleHyphens } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/link-tile/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/link-tile/configurator/introduction.mdx';
import { linkTileSlotStory, linkTileStory } from '@/app/(main)/components/link-tile/configurator/story';
import ColorSchemeDescription from '@/app/(main)/components/link-tile/examples/color-scheme/example.mdx';
import { linkTileStoryColorScheme } from '@/app/(main)/components/link-tile/examples/color-scheme/story';
import FooterSlotDescription from '@/app/(main)/components/link-tile/examples/footer-slot/example.mdx';
import { linkTileStoryFooterSlot } from '@/app/(main)/components/link-tile/examples/footer-slot/story';
import HyphensDescription from '@/app/(main)/components/link-tile/examples/hyphens/example.mdx';
import UiBehaviourDescription from '@/app/(main)/components/link-tile/examples/ui-behaviour/example.mdx';
import { linkTileStoryLayout } from '@/app/(main)/components/link-tile/examples/ui-behaviour/story';
import WithVideoDescription from '@/app/(main)/components/link-tile/examples/with-video/example.mdx';
import { linkTileStoryVideo } from '@/app/(main)/components/link-tile/examples/with-video/story';
import Usage from '@/app/(main)/components/link-tile/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const linkTileMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: linkTileStory,
    slotStories: linkTileSlotStory,
  },
  examples: {
    withVideo: {
      kind: 'story',
      name: 'With video',
      description: WithVideoDescription,
      story: linkTileStoryVideo,
    },
    uiBehaviour: {
      kind: 'story',
      name: 'UI behaviour',
      description: UiBehaviourDescription,
      story: linkTileStoryLayout,
    },
    hyphens: {
      kind: 'example',
      name: 'Hyphens',
      description: HyphensDescription,
      example: linkTileExampleHyphens,
    },
    footerSlot: {
      kind: 'story',
      name: 'Footer slot',
      description: FooterSlotDescription,
      story: linkTileStoryFooterSlot,
    },
    colorScheme: {
      kind: 'story',
      name: 'Color scheme',
      description: ColorSchemeDescription,
      story: linkTileStoryColorScheme,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-link-tile'],
} satisfies ComponentDocsMeta<'p-link-tile'>;
