import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/(main)/components/accordion/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/accordion/configurator/introduction.mdx';
import { accordionSlotStories, accordionStory } from '@/app/(main)/components/accordion/configurator/story';
import InteractiveDescription from '@/app/(main)/components/accordion/examples/interactive-elements-in-summary/example.mdx';
import { accordionStoryInteractiveSummary } from '@/app/(main)/components/accordion/examples/interactive-elements-in-summary/story';
import StickyDescription from '@/app/(main)/components/accordion/examples/sticky-summary/example.mdx';
import { accordionStoryStickySummary } from '@/app/(main)/components/accordion/examples/sticky-summary/story';
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
  accessibility: Accessibility,
  api: componentMeta['p-accordion'],
} satisfies ComponentDocsMeta<'p-accordion'>;
