import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/(main)/components/popover/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/popover/configurator/introduction.mdx';
import { popoverSlotStories, popoverStory } from '@/app/(main)/components/popover/configurator/story';
import SlottedButtonDescription from '@/app/(main)/components/popover/examples/slotted-button/example.mdx';
import { popoverSlottedButtonStory } from '@/app/(main)/components/popover/examples/slotted-button/story';
import Usage from '@/app/(main)/components/popover/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const popoverMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: popoverStory,
    slotStories: popoverSlotStories,
  },
  examples: {
    slottedButton: {
      kind: 'story',
      name: 'Slotted button',
      description: SlottedButtonDescription,
      story: popoverSlottedButtonStory,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-popover'],
} satisfies ComponentDocsMeta<'p-popover'>;

