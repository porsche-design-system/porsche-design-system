import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/link-tile-product/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/link-tile-product/configurator/introduction.mdx';
import { linkTileProductStory } from '@/app/components/link-tile-product/configurator/story';
import FrameworkRoutingDescription from '@/app/components/link-tile-product/examples/framework-routing/example.mdx';
import { linkTileProductStoryFrameworkRouting } from '@/app/components/link-tile-product/examples/framework-routing/story';
import Usage from '@/app/components/link-tile-product/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const linkTileProductMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: linkTileProductStory,
  },
  examples: {
    frameworkRouting: {
      kind: 'story',
      name: 'Framework routing (anchor nesting)',
      description: FrameworkRoutingDescription,
      story: linkTileProductStoryFrameworkRouting,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-link-tile-product'],
} satisfies ComponentDocsMeta<'p-link-tile-product'>;

