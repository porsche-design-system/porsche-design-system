import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/tabs-bar/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/tabs-bar/configurator/introduction.mdx';
import { tabsBarStory } from '@/app/components/tabs-bar/configurator/story';
import GradientDescription from '@/app/components/tabs-bar/examples/gradient/example.mdx';
import { tabsBarStoryGradient } from '@/app/components/tabs-bar/examples/gradient/story';
import LinksDescription from '@/app/components/tabs-bar/examples/links/example.mdx';
import { tabsBarStoryLinks } from '@/app/components/tabs-bar/examples/links/story';
import Usage from '@/app/components/tabs-bar/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tabsBarMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: tabsBarStory,
  },
  examples: {
    links: {
      kind: 'story',
      name: 'Links',
      description: LinksDescription,
      story: tabsBarStoryLinks,
    },
    gradient: {
      kind: 'story',
      name: 'Gradient color',
      description: GradientDescription,
      story: tabsBarStoryGradient,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-tabs-bar'],
} satisfies ComponentDocsMeta<'p-tabs-bar'>;

