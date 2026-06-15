import { componentMeta } from '@porsche-design-system/component-meta';
import { radioGroupExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/radio-group/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/radio-group/configurator/introduction.mdx';
import { radioGroupSlotStories, radioGroupStory } from '@/app/(main)/components/radio-group/configurator/story';
import FormDescription from '@/app/(main)/components/radio-group/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/radio-group/examples/slots/example.mdx';
import { radioGroupStorySlots } from '@/app/(main)/components/radio-group/examples/slots/story';
import Usage from '@/app/(main)/components/radio-group/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const radioGroupMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: radioGroupStory,
    slotStories: radioGroupSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: radioGroupExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: radioGroupStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-radio-group'],
} satisfies ComponentDocsMeta<'p-radio-group'>;

