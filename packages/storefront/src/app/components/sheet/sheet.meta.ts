import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/sheet/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/sheet/configurator/introduction.mdx';
import { sheetSlotStories, sheetStory } from '@/app/components/sheet/configurator/story';
import Usage from '@/app/components/sheet/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const sheetMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: sheetStory,
    slotStories: sheetSlotStories,
  },
  examples: {},
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-sheet'],
} satisfies ComponentDocsMeta<'p-sheet'>;

