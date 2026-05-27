// accordion.meta.ts — explicit, no require.context

import type { ComponentExampleMeta } from '@/models/meta';
import IntroductionDescription from './configurator/introduction.mdx';
import { accordionSlotStories, accordionStory } from './configurator/story';
import {
  accordionStoryInteractiveSummary,
  accordionStoryInteractiveSummaryName,
} from './examples/interactive-elements-in-summary/example';
import InteractiveDescription from './examples/interactive-elements-in-summary/example.mdx';
import { accordionStoryStickySummary, accordionStoryStickySummaryName } from './examples/sticky-summary/example';
import StickyDescription from './examples/sticky-summary/example.mdx';

export const accordionMeta: ComponentExampleMeta<'p-accordion'> = {
  configurator: {
    name: 'Default',
    description: IntroductionDescription,
    story: accordionStory,
    slotStories: accordionSlotStories,
  },
  stickySummary: {
    name: accordionStoryStickySummaryName,
    description: StickyDescription,
    story: accordionStoryStickySummary,
  },
  interactiveElementsInSummary: {
    name: accordionStoryInteractiveSummaryName,
    description: InteractiveDescription,
    story: accordionStoryInteractiveSummary,
  },
};
