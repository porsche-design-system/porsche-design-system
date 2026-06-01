import { componentMeta } from '@porsche-design-system/component-meta';
import { scrollerExample } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/components/scroller/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/scroller/configurator/introduction.mdx';
import { scrollerStory } from '@/app/components/scroller/configurator/story';
import HeightDescription from '@/app/components/scroller/examples/height/example.mdx';
import { scrollerStoryHeight } from '@/app/components/scroller/examples/height/story';
import ScrollToPositionDescription from '@/app/components/scroller/examples/scroll-to-position/example.mdx';
import Usage from '@/app/components/scroller/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const scrollerMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: scrollerStory,
  },
  examples: {
    height: {
      kind: 'story',
      name: 'Height',
      description: HeightDescription,
      story: scrollerStoryHeight,
    },
    scrollToPosition: {
      kind: 'example',
      name: 'Scroll to position',
      description: ScrollToPositionDescription,
      example: scrollerExample,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-scroller'],
} satisfies ComponentDocsMeta<'p-scroller'>;

