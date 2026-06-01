import { componentMeta } from '@porsche-design-system/component-meta';
import { inputDateExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/components/input-date/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/input-date/configurator/introduction.mdx';
import { inputDateSlotStories, inputDateStory } from '@/app/components/input-date/configurator/story';
import FormDescription from '@/app/components/input-date/examples/form/example.mdx';
import SlotsDescription from '@/app/components/input-date/examples/slots/example.mdx';
import { inputDateStorySlots } from '@/app/components/input-date/examples/slots/story';
import Usage from '@/app/components/input-date/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputDateMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputDateStory,
    slotStories: inputDateSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputDateExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputDateStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-input-date'],
} satisfies ComponentDocsMeta<'p-input-date'>;

