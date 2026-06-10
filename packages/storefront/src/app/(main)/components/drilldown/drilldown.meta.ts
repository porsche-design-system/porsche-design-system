import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/(main)/components/drilldown/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/drilldown/configurator/introduction.mdx';
import { drilldownStory } from '@/app/(main)/components/drilldown/configurator/story';
import CustomContentDescription from '@/app/(main)/components/drilldown/examples/custom-content/example.mdx';
import { drilldownStoryCustomContent } from '@/app/(main)/components/drilldown/examples/custom-content/story';
import Usage from '@/app/(main)/components/drilldown/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const drilldownMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: drilldownStory,
  },
  examples: {
    customContent: {
      kind: 'story',
      name: 'Example with custom content',
      description: CustomContentDescription,
      story: drilldownStoryCustomContent,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-drilldown'],
} satisfies ComponentDocsMeta<'p-drilldown'>;

