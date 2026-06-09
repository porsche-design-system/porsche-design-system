import { componentMeta } from '@porsche-design-system/component-meta';
import { inputTextExampleControlled, inputTextExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/input-text/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/input-text/configurator/introduction.mdx';
import { inputTextSlotStories, inputTextStory } from '@/app/(main)/components/input-text/configurator/story';
import ControlledDescription from '@/app/(main)/components/input-text/examples/controlled/example.mdx';
import FormDescription from '@/app/(main)/components/input-text/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-text/examples/slots/example.mdx';
import { inputTextStorySlots } from '@/app/(main)/components/input-text/examples/slots/story';
import Usage from '@/app/(main)/components/input-text/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputTextMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputTextStory,
    slotStories: inputTextSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputTextExampleForm,
    },
    controlled: {
      kind: 'example',
      name: 'Controlled Input (Preventing User Input)',
      description: ControlledDescription,
      example: inputTextExampleControlled,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputTextStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-input-text'],
} satisfies ComponentDocsMeta<'p-input-text'>;

