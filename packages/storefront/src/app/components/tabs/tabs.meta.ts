import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/tabs/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/tabs/configurator/introduction.mdx';
import { tabsStory } from '@/app/components/tabs/configurator/story';
import ActiveTabDescription from '@/app/components/tabs/examples/active-tab/example.mdx';
import { tabsStoryActiveTabIndex } from '@/app/components/tabs/examples/active-tab/story';
import GradientDescription from '@/app/components/tabs/examples/gradient/example.mdx';
import { tabsStoryGradient } from '@/app/components/tabs/examples/gradient/story';
import Usage from '@/app/components/tabs/usage/page.mdx';
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

