import { componentMeta } from '@porsche-design-system/component-meta';
import { inputNumberExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/input-number/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/input-number/configurator/introduction.mdx';
import { inputNumberSlotStories, inputNumberStory } from '@/app/(main)/components/input-number/configurator/story';
import FormDescription from '@/app/(main)/components/input-number/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-number/examples/slots/example.mdx';
import { inputNumberStorySlots } from '@/app/(main)/components/input-number/examples/slots/story';
import Usage from '@/app/(main)/components/input-number/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputNumberMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputNumberStory,
    slotStories: inputNumberSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputNumberExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputNumberStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-input-number'],
} satisfies ComponentDocsMeta<'p-input-number'>;

