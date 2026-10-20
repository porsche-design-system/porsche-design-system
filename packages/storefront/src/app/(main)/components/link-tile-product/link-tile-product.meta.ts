import { componentMeta } from '@porsche-design-system/component-meta';
import { linkTileProductStory } from '@porsche-design-system/examples-stories/components/link-tile-product/default/story';
import FrameworkRoutingDescription from '@porsche-design-system/examples-stories/components/link-tile-product/framework-routing/example.mdx';
import { linkTileProductStoryFrameworkRouting } from '@porsche-design-system/examples-stories/components/link-tile-product/framework-routing/story';
import AccessibilityOverview from '@/app/(main)/components/link-tile-product/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/link-tile-product/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/link-tile-product/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/link-tile-product/usage/page.mdx';
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
  accessibility: {
    overview: AccessibilityOverview,
    examples: {},
    tests: AccessibilityTests,
  },
  api: componentMeta['p-link-tile-product'],
} satisfies ComponentDocsMeta<'p-link-tile-product'>;
