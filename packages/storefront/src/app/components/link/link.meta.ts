import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/link/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/link/configurator/introduction.mdx';
import { linkSlotStories, linkStory } from '@/app/components/link/configurator/story';
import FrameworkRoutingDescription from '@/app/components/link/examples/framework-routing/example.mdx';
import { linkStoryFrameworkRouting } from '@/app/components/link/examples/framework-routing/story';
import IconDescription from '@/app/components/link/examples/icon/example.mdx';
import { linkStoryIcon } from '@/app/components/link/examples/icon/story';
import Usage from '@/app/components/link/usage/page.mdx';
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

