import { componentMeta } from '@porsche-design-system/component-meta';
import { inputEmailExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/components/input-email/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/input-email/configurator/introduction.mdx';
import { inputEmailSlotStories, inputEmailStory } from '@/app/components/input-email/configurator/story';
import FormDescription from '@/app/components/input-email/examples/form/example.mdx';
import SlotsDescription from '@/app/components/input-email/examples/slots/example.mdx';
import { inputEmailStorySlots } from '@/app/components/input-email/examples/slots/story';
import Usage from '@/app/components/input-email/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputEmailMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputEmailStory,
    slotStories: inputEmailSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputEmailExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputEmailStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-input-email'],
} satisfies ComponentDocsMeta<'p-input-email'>;

