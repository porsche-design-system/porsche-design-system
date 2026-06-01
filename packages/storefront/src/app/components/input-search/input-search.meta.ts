import { componentMeta } from '@porsche-design-system/component-meta';
import { inputSearchExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/components/input-search/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/input-search/configurator/introduction.mdx';
import { inputSearchSlotStories, inputSearchStory } from '@/app/components/input-search/configurator/story';
import AriaComboboxDescription from '@/app/components/input-search/examples/aria-combobox/example.mdx';
import { inputSearchStoryAriaComboboxSketch } from '@/app/components/input-search/examples/aria-combobox/story';
import FormDescription from '@/app/components/input-search/examples/form/example.mdx';
import SlotsDescription from '@/app/components/input-search/examples/slots/example.mdx';
import { inputSearchStorySlots } from '@/app/components/input-search/examples/slots/story';
import Usage from '@/app/components/input-search/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inputSearchMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inputSearchStory,
    slotStories: inputSearchSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: inputSearchExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: inputSearchStorySlots,
    },
    ariaCombobox: {
      kind: 'story',
      name: 'Used as a Combobox',
      description: AriaComboboxDescription,
      story: inputSearchStoryAriaComboboxSketch,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-input-search'],
} satisfies ComponentDocsMeta<'p-input-search'>;

