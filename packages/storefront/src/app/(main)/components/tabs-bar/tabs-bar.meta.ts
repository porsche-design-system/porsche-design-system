import { componentMeta } from '@porsche-design-system/component-meta';
import { routeNavigationWithoutLandmarkLabelA11yExample } from '@porsche-design-system/examples-stories/components/tabs-bar/accessibility/route-navigation-without-landmark-label/example';
import { tabbedInterfaceWithoutTablistLabelA11yExample } from '@porsche-design-system/examples-stories/components/tabs-bar/accessibility/tabbed-interface-without-tablist-label/example';
import { tabsBarStory } from '@porsche-design-system/examples-stories/components/tabs-bar/default/story';
import GradientDescription from '@porsche-design-system/examples-stories/components/tabs-bar/gradient/example.mdx';
import { tabsBarStoryGradient } from '@porsche-design-system/examples-stories/components/tabs-bar/gradient/story';
import LabellingDescription from '@porsche-design-system/examples-stories/components/tabs-bar/labelling/example.mdx';
import { tabsBarStoryLabelling } from '@porsche-design-system/examples-stories/components/tabs-bar/labelling/story';
import LinksDescription from '@porsche-design-system/examples-stories/components/tabs-bar/links/example.mdx';
import { tabsBarStoryLinks } from '@porsche-design-system/examples-stories/components/tabs-bar/links/story';
import AccessibilityOverview from '@/app/(main)/components/tabs-bar/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tabs-bar/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tabs-bar/configurator/introduction.mdx';
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
