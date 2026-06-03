import { componentMeta } from '@porsche-design-system/component-meta';
import { inputUrlExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/input-url/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/input-url/configurator/introduction.mdx';
import { inputUrlSlotStories, inputUrlStory } from '@/app/(main)/components/input-url/configurator/story';
import FormDescription from '@/app/(main)/components/input-url/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-url/examples/slots/example.mdx';
import { inputUrlStorySlots } from '@/app/(main)/components/input-url/examples/slots/story';
import Usage from '@/app/(main)/components/input-url/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputUrlMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputUrlStory,
    slotStories: inputUrlSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputUrlExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputUrlStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-input-url'],
} satisfies ComponentDocsMeta<'p-input-url'>;

