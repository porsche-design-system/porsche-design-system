import { componentMeta } from '@porsche-design-system/component-meta';
import { textareaExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/textarea/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/textarea/configurator/introduction.mdx';
import { textareaSlotStories, textareaStory } from '@/app/(main)/components/textarea/configurator/story';
import FormDescription from '@/app/(main)/components/textarea/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/textarea/examples/slots/example.mdx';
import { textareaStorySlots } from '@/app/(main)/components/textarea/examples/slots/story';
import Usage from '@/app/(main)/components/textarea/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const textareaMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: textareaStory,
    slotStories: textareaSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: textareaExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: textareaStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-textarea'],
} satisfies ComponentDocsMeta<'p-textarea'>;

