import Accessibility from '@/app/components/accordion/accessibility.mdx';
import IntroductionDescription from '@/app/components/accordion/configurator/introduction.mdx';
import { accordionSlotStories, accordionStory } from '@/app/components/accordion/configurator/story';
import InteractiveDescription from '@/app/components/accordion/examples/interactive-elements-in-summary/example.mdx';
import {
  accordionStoryInteractiveSummary,
  accordionStoryInteractiveSummaryName,
} from '@/app/components/accordion/examples/interactive-elements-in-summary/story';
import StickyDescription from '@/app/components/accordion/examples/sticky-summary/example.mdx';
import {
  accordionStoryStickySummary,
  accordionStoryStickySummaryName,
} from '@/app/components/accordion/examples/sticky-summary/story';
import Usage from '@/app/components/accordion/usage.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const accordionMeta = {
  configurator: {
    name: 'Default',
    description: IntroductionDescription,
    story: accordionStory,
    slotStories: accordionSlotStories,
  },
  examples: {
    stickySummary: {
      kind: 'story',
      name: accordionStoryStickySummaryName,
      description: StickyDescription,
      story: accordionStoryStickySummary,
    },
    interactiveElementsInSummary: {
      kind: 'story',
      name: accordionStoryInteractiveSummaryName,
      description: InteractiveDescription,
      story: accordionStoryInteractiveSummary,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
} satisfies ComponentDocsMeta<'p-accordion'>;
