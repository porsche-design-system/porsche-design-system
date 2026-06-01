import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/popover/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/popover/configurator/introduction.mdx';
import { popoverStory } from '@/app/components/popover/configurator/story';
import PopoverMaxWidthDescription from '@/app/components/popover/examples/max-width-variable/example.mdx';
import { popoverMaxWidthStory } from '@/app/components/popover/examples/max-width-variable/story';
import SlottedButtonDescription from '@/app/components/popover/examples/slotted-button/example.mdx';
import { popoverSlottedButtonStory } from '@/app/components/popover/examples/slotted-button/story';
import Usage from '@/app/components/popover/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const popoverMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: popoverStory,
  },
  examples: {
    slottedButton: {
      kind: 'story',
      name: 'Slotted button',
      description: SlottedButtonDescription,
      story: popoverSlottedButtonStory,
    },
    customStyling: {
      kind: 'story',
      name: 'Popover max-width css variable',
      description: PopoverMaxWidthDescription,
      story: popoverMaxWidthStory,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-popover'],
} satisfies ComponentDocsMeta<'p-popover'>;
