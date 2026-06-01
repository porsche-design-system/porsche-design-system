import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/divider/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/divider/configurator/introduction.mdx';
import { dividerStory } from '@/app/components/divider/configurator/story';
import ResponsiveDescription from '@/app/components/divider/examples/responsive/example.mdx';
import { dividerStoryResponsive } from '@/app/components/divider/examples/responsive/story';
import VerticalDescription from '@/app/components/divider/examples/vertical/example.mdx';
import { dividerStoryVertical } from '@/app/components/divider/examples/vertical/story';
import Usage from '@/app/components/divider/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const dividerMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: dividerStory,
  },
  examples: {
    vertical: {
      kind: 'story',
      name: 'Vertical',
      description: VerticalDescription,
      story: dividerStoryVertical,
    },
    responsive: {
      kind: 'story',
      name: 'Responsive',
      description: ResponsiveDescription,
      story: dividerStoryResponsive,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-divider'],
} satisfies ComponentDocsMeta<'p-divider'>;

