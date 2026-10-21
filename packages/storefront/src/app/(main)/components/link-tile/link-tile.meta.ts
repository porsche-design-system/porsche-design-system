import { componentMeta } from '@porsche-design-system/component-meta';
import { linkTileExampleHyphens } from '@porsche-design-system/examples-framework';
import HyphensDescription from '@porsche-design-system/examples-framework/components/link-tile/hyphens/example.mdx';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/link-tile/accessibility/aria-on-component-host-vs-aria-prop/example';
import { vagueLinkLabelWithoutContextA11yExample } from '@porsche-design-system/examples-stories/components/link-tile/accessibility/vague-link-label-without-context/example';
import ColorSchemeDescription from '@porsche-design-system/examples-stories/components/link-tile/color-scheme/example.mdx';
import { linkTileStoryColorScheme } from '@porsche-design-system/examples-stories/components/link-tile/color-scheme/story';
import {
  linkTileSlotStory,
  linkTileStory,
} from '@porsche-design-system/examples-stories/components/link-tile/default/story';
import FooterSlotDescription from '@porsche-design-system/examples-stories/components/link-tile/footer-slot/example.mdx';
import { linkTileStoryFooterSlot } from '@porsche-design-system/examples-stories/components/link-tile/footer-slot/story';
import UiBehaviourDescription from '@porsche-design-system/examples-stories/components/link-tile/ui-behaviour/example.mdx';
import { linkTileStoryLayout } from '@porsche-design-system/examples-stories/components/link-tile/ui-behaviour/story';
import WithVideoDescription from '@porsche-design-system/examples-stories/components/link-tile/with-video/example.mdx';
import { linkTileStoryVideo } from '@porsche-design-system/examples-stories/components/link-tile/with-video/story';
import AccessibilityOverview from '@/app/(main)/components/link-tile/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/link-tile/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/link-tile/configurator/introduction.mdx';
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
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      vagueLinkLabelWithoutContext: vagueLinkLabelWithoutContextA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-link-tile'],
} satisfies ComponentDocsMeta<'p-link-tile'>;
