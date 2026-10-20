import { componentMeta } from '@porsche-design-system/component-meta';
import { accordionSummaryWithoutSemanticHeadingA11yExample } from '@porsche-design-system/examples-accessibility/components/accordion/accessibility/accordion-summary-without-semantic-heading/example';
import { skippedHeadingLevelA11yExample } from '@porsche-design-system/examples-accessibility/components/accordion/accessibility/skipped-heading-level/example';
import {
  accordionSlotStories,
  accordionStory,
} from '@porsche-design-system/examples-stories/components/accordion/default/story';
import InteractiveDescription from '@porsche-design-system/examples-stories/components/accordion/interactive-elements-in-summary/example.mdx';
import { accordionStoryInteractiveSummary } from '@porsche-design-system/examples-stories/components/accordion/interactive-elements-in-summary/story';
import StickyDescription from '@porsche-design-system/examples-stories/components/accordion/sticky-summary/example.mdx';
import { accordionStoryStickySummary } from '@porsche-design-system/examples-stories/components/accordion/sticky-summary/story';
import AccessibilityOverview from '@/app/(main)/components/accordion/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/accordion/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/accordion/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/accordion/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const accordionMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: accordionStory,
    slotStories: accordionSlotStories,
  },
  examples: {
    stickySummary: {
      kind: 'story',
      name: 'Sticky summary',
      description: StickyDescription,
      story: accordionStoryStickySummary,
    },
    interactiveElementsInSummary: {
      kind: 'story',
      name: 'Interactive elements in summary',
      description: InteractiveDescription,
      story: accordionStoryInteractiveSummary,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      accordionSummaryWithoutSemanticHeading: accordionSummaryWithoutSemanticHeadingA11yExample,
      skippedHeadingLevel: skippedHeadingLevelA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-accordion'],
} satisfies ComponentDocsMeta<'p-accordion'>;
