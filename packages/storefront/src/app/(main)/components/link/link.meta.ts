import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/(main)/components/link/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/link/configurator/introduction.mdx';
import { linkSlotStories, linkStory } from '@/app/(main)/components/link/configurator/story';
import FrameworkRoutingDescription from '@/app/(main)/components/link/examples/framework-routing/example.mdx';
import { linkStoryFrameworkRouting } from '@/app/(main)/components/link/examples/framework-routing/story';
import IconDescription from '@/app/(main)/components/link/examples/icon/example.mdx';
import { linkStoryIcon } from '@/app/(main)/components/link/examples/icon/story';
import Usage from '@/app/(main)/components/link/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const linkMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: linkStory,
    slotStories: linkSlotStories,
  },
  examples: {
    frameworkRouting: {
      kind: 'story',
      name: 'Framework routing (anchor nesting)',
      description: FrameworkRoutingDescription,
      story: linkStoryFrameworkRouting,
    },
    icon: {
      kind: 'story',
      name: 'Link with specific icon',
      description: IconDescription,
      story: linkStoryIcon,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-link'],
} satisfies ComponentDocsMeta<'p-link'>;

