import { componentMeta } from '@porsche-design-system/component-meta';
import { inputWeekExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/components/input-week/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/input-week/configurator/introduction.mdx';
import { inputWeekSlotStories, inputWeekStory } from '@/app/components/input-week/configurator/story';
import FormDescription from '@/app/components/input-week/examples/form/example.mdx';
import SlotsDescription from '@/app/components/input-week/examples/slots/example.mdx';
import { inputWeekStorySlots } from '@/app/components/input-week/examples/slots/story';
import Usage from '@/app/components/input-week/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputWeekMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputWeekStory,
    slotStories: inputWeekSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputWeekExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputWeekStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-input-week'],
} satisfies ComponentDocsMeta<'p-input-week'>;

