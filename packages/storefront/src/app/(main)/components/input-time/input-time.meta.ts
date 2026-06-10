import { componentMeta } from '@porsche-design-system/component-meta';
import { inputTimeExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/input-time/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/input-time/configurator/introduction.mdx';
import { inputTimeSlotStories, inputTimeStory } from '@/app/(main)/components/input-time/configurator/story';
import FormDescription from '@/app/(main)/components/input-time/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-time/examples/slots/example.mdx';
import { inputTimeStorySlots } from '@/app/(main)/components/input-time/examples/slots/story';
import Usage from '@/app/(main)/components/input-time/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputTimeMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputTimeStory,
    slotStories: inputTimeSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputTimeExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputTimeStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-input-time'],
} satisfies ComponentDocsMeta<'p-input-time'>;

