import { componentMeta } from '@porsche-design-system/component-meta';
import { inputTelExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/input-tel/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/input-tel/configurator/introduction.mdx';
import { inputTelSlotStories, inputTelStory } from '@/app/(main)/components/input-tel/configurator/story';
import FormDescription from '@/app/(main)/components/input-tel/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/input-tel/examples/slots/example.mdx';
import { inputTelStorySlots } from '@/app/(main)/components/input-tel/examples/slots/story';
import Usage from '@/app/(main)/components/input-tel/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputTelMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputTelStory,
    slotStories: inputTelSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputTelExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputTelStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-input-tel'],
} satisfies ComponentDocsMeta<'p-input-tel'>;

