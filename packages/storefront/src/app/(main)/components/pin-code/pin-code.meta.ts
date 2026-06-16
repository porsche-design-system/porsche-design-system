import { componentMeta } from '@porsche-design-system/component-meta';
import { pinCodeExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/pin-code/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/pin-code/configurator/introduction.mdx';
import { pinCodeSlotStories, pinCodeStory } from '@/app/(main)/components/pin-code/configurator/story';
import CopyPasteDescription from '@/app/(main)/components/pin-code/examples/copy-paste/example.mdx';
import FormDescription from '@/app/(main)/components/pin-code/examples/form/example.mdx';
import SlotsDescription from '@/app/(main)/components/pin-code/examples/slots/example.mdx';
import { pinCodeStorySlots } from '@/app/(main)/components/pin-code/examples/slots/story';
import Usage from '@/app/(main)/components/pin-code/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const pinCodeMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: pinCodeStory,
    slotStories: pinCodeSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: pinCodeExampleForm,
    },
    copyPaste: {
      kind: 'story',
      name: 'Copy+Paste and autocomplete',
      description: CopyPasteDescription,
      story: pinCodeStory,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: pinCodeStorySlots,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-pin-code'],
} satisfies ComponentDocsMeta<'p-pin-code'>;

