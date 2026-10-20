import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/scroller/accessibility/aria-on-component-host-vs-aria-prop/example';
import { scrollerExample } from '@porsche-design-system/examples-framework';
import ScrollToPositionDescription from '@porsche-design-system/examples-framework/components/scroller/scroll-to-position/example.mdx';
import { scrollerStory } from '@porsche-design-system/examples-stories/components/scroller/default/story';
import HeightDescription from '@porsche-design-system/examples-stories/components/scroller/height/example.mdx';
import { scrollerStoryHeight } from '@porsche-design-system/examples-stories/components/scroller/height/story';
import AccessibilityOverview from '@/app/(main)/components/scroller/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/scroller/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/scroller/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/scroller/usage/page.mdx';
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
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-scroller'],
} satisfies ComponentDocsMeta<'p-scroller'>;
