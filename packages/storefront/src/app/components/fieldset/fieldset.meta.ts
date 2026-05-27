import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/fieldset/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/fieldset/configurator/introduction.mdx';
import { fieldsetSlotStories, fieldsetStory } from '@/app/components/fieldset/configurator/story';
import RequiredDescription from '@/app/components/fieldset/examples/required/example.mdx';
import { fieldsetStoryRequired, fieldsetStoryRequiredRadio } from '@/app/components/fieldset/examples/required/story';
import SlottedLabelDescription from '@/app/components/fieldset/examples/slotted-label/example.mdx';
import { fieldsetStorySlottedLabel } from '@/app/components/fieldset/examples/slotted-label/story';
import SlottedMessageDescription from '@/app/components/fieldset/examples/slotted-message/example.mdx';
import { fieldsetStorySlottedMessage } from '@/app/components/fieldset/examples/slotted-message/story';
import Usage from '@/app/components/fieldset/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const fieldsetMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: fieldsetStory,
    slotStories: fieldsetSlotStories,
  },
  examples: {
    slottedLabel: {
      kind: 'story',
      name: 'Slotted label',
      description: SlottedLabelDescription,
      story: fieldsetStorySlottedLabel,
    },
    slottedMessage: {
      kind: 'story',
      name: 'Slotted message',
      description: SlottedMessageDescription,
      story: fieldsetStorySlottedMessage,
    },
    required: {
      kind: 'story',
      name: 'Required',
      description: RequiredDescription,
      story: fieldsetStoryRequiredRadio,
    },
    requiredInputs: {
      kind: 'story',
      name: 'Required fieldset with input fields',
      story: fieldsetStoryRequired,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-fieldset'],
} satisfies ComponentDocsMeta<'p-fieldset'>;

