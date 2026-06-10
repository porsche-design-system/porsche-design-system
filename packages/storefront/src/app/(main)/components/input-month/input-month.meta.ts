import { componentMeta } from '@porsche-design-system/component-meta';
import { inputMonthExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/input-month/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/input-month/configurator/introduction.mdx';
import { inputMonthSlotStories, inputMonthStory } from '@/app/(main)/components/input-month/configurator/story';
import FormDescription from '@/app/(main)/components/input-month/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-month/examples/slots/example.mdx';
import { inputMonthStorySlots } from '@/app/(main)/components/input-month/examples/slots/story';
import Usage from '@/app/(main)/components/input-month/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputMonthMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputMonthStory,
    slotStories: inputMonthSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputMonthExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputMonthStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-input-month'],
} satisfies ComponentDocsMeta<'p-input-month'>;

