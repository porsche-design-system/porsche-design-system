import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/link-pure/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/link-pure/configurator/introduction.mdx';
import { linkPureStory } from '@/app/components/link-pure/configurator/story';
import CustomClickableAreaDescription from '@/app/components/link-pure/examples/custom-clickable-area/example.mdx';
import { linkPureCustomPadding } from '@/app/components/link-pure/examples/custom-clickable-area/story';
import FrameworkRoutingDescription from '@/app/components/link-pure/examples/framework-routing/example.mdx';
import { linkPureStoryFrameworkRouting } from '@/app/components/link-pure/examples/framework-routing/story';
import IconDescription from '@/app/components/link-pure/examples/icon/example.mdx';
import { linkPureStoryIcon } from '@/app/components/link-pure/examples/icon/story';
import Usage from '@/app/components/link-pure/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const linkPureMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: linkPureStory,
  },
  examples: {
    icon: {
      kind: 'story',
      name: 'Link with specific icon',
      description: IconDescription,
      story: linkPureStoryIcon,
    },
    frameworkRouting: {
      kind: 'story',
      name: 'Framework routing (anchor nesting)',
      description: FrameworkRoutingDescription,
      story: linkPureStoryFrameworkRouting,
    },
    customClickableArea: {
      kind: 'story',
      name: 'Link Pure with custom clickable/focusable area',
      description: CustomClickableAreaDescription,
      story: linkPureCustomPadding,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-link-pure'],
} satisfies ComponentDocsMeta<'p-link-pure'>;

