import { componentMeta } from '@porsche-design-system/component-meta';
import { routeNavigationWithoutLandmarkLabelA11yExample } from '@/app/(main)/components/tabs-bar/accessibility/examples/route-navigation-without-landmark-label/example';
import { tabbedInterfaceWithoutTablistLabelA11yExample } from '@/app/(main)/components/tabs-bar/accessibility/examples/tabbed-interface-without-tablist-label/example';
import AccessibilityOverview from '@/app/(main)/components/tabs-bar/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tabs-bar/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tabs-bar/configurator/introduction.mdx';
import { tabsBarStory } from '@/app/(main)/components/tabs-bar/configurator/story';
import GradientDescription from '@/app/(main)/components/tabs-bar/examples/gradient/example.mdx';
import { tabsBarStoryGradient } from '@/app/(main)/components/tabs-bar/examples/gradient/story';
import LabellingDescription from '@/app/(main)/components/tabs-bar/examples/labelling/example.mdx';
import { tabsBarStoryLabelling } from '@/app/(main)/components/tabs-bar/examples/labelling/story';
import LinksDescription from '@/app/(main)/components/tabs-bar/examples/links/example.mdx';
import { tabsBarStoryLinks } from '@/app/(main)/components/tabs-bar/examples/links/story';
import Usage from '@/app/(main)/components/tabs-bar/usage/page.mdx';
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
    labelling: {
      kind: 'story',
      name: 'Labelling',
      description: LabellingDescription,
      story: tabsBarStoryLabelling,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      tabbedInterfaceWithoutTablistLabel: tabbedInterfaceWithoutTablistLabelA11yExample,
      routeNavigationWithoutLandmarkLabel: routeNavigationWithoutLandmarkLabelA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-tabs-bar'],
} satisfies ComponentDocsMeta<'p-tabs-bar'>;
