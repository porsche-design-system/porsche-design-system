import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/(main)/components/tabs/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/tabs/configurator/introduction.mdx';
import { tabsStory } from '@/app/(main)/components/tabs/configurator/story';
import ActiveTabDescription from '@/app/(main)/components/tabs/examples/active-tab/example.mdx';
import { tabsStoryActiveTabIndex } from '@/app/(main)/components/tabs/examples/active-tab/story';
import GradientDescription from '@/app/(main)/components/tabs/examples/gradient/example.mdx';
import { tabsStoryGradient } from '@/app/(main)/components/tabs/examples/gradient/story';
import Usage from '@/app/(main)/components/tabs/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tabsMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: tabsStory,
  },
  examples: {
    gradient: {
      kind: 'story',
      name: 'Gradient color',
      description: GradientDescription,
      story: tabsStoryGradient,
    },
    activeTab: {
      kind: 'story',
      name: 'Active Tab',
      description: ActiveTabDescription,
      story: tabsStoryActiveTabIndex,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-tabs'],
} satisfies ComponentDocsMeta<'p-tabs'>;

