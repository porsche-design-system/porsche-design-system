import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/tile/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tile/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tile/configurator/introduction.mdx';
import { tileSlotStories, tileStory } from '@/app/(main)/components/tile/configurator/story';
import HoverEffectDescription from '@/app/(main)/components/tile/examples/hover-effect/example.mdx';
import { tileStoryHoverEffect } from '@/app/(main)/components/tile/examples/hover-effect/story';
import Usage from '@/app/(main)/components/tile/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tileMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: tileStory,
    slotStories: tileSlotStories,
  },
  examples: {
    hoverEffect: {
      kind: 'story',
      name: 'Hover effect',
      description: HoverEffectDescription,
      story: tileStoryHoverEffect,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {},
    tests: AccessibilityTests,
  },
  api: componentMeta['p-tile'],
} satisfies ComponentDocsMeta<'p-tile'>;
