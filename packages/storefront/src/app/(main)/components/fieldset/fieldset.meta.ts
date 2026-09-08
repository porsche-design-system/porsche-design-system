import { componentMeta } from '@porsche-design-system/component-meta';
import { errorStateWithoutRecoveryGuidanceA11yExample } from '@/app/(main)/components/fieldset/accessibility/examples/error-state-without-recovery-guidance/example';
import { unlabeledFieldGroupA11yExample } from '@/app/(main)/components/fieldset/accessibility/examples/unlabeled-field-group/example';
import AccessibilityOverview from '@/app/(main)/components/fieldset/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/fieldset/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/fieldset/configurator/introduction.mdx';
import { fieldsetSlotStories, fieldsetStory } from '@/app/(main)/components/fieldset/configurator/story';
import RequiredDescription from '@/app/(main)/components/fieldset/examples/required/example.mdx';
import { fieldsetStoryRequired } from '@/app/(main)/components/fieldset/examples/required/story';
import SlottedLabelDescription from '@/app/(main)/components/fieldset/examples/slotted-label/example.mdx';
import { fieldsetStorySlottedLabel } from '@/app/(main)/components/fieldset/examples/slotted-label/story';
import SlottedMessageDescription from '@/app/(main)/components/fieldset/examples/slotted-message/example.mdx';
import { fieldsetStorySlottedMessage } from '@/app/(main)/components/fieldset/examples/slotted-message/story';
import Usage from '@/app/(main)/components/fieldset/usage/page.mdx';
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
      story: fieldsetStoryRequired,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      unlabeledFieldGroup: unlabeledFieldGroupA11yExample,
      errorStateWithoutRecoveryGuidance: errorStateWithoutRecoveryGuidanceA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-fieldset'],
} satisfies ComponentDocsMeta<'p-fieldset'>;
