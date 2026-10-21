import { componentMeta } from '@porsche-design-system/component-meta';
import { errorStateWithoutRecoveryGuidanceA11yExample } from '@porsche-design-system/examples-stories/components/fieldset/accessibility/error-state-without-recovery-guidance/example';
import { unlabeledFieldGroupA11yExample } from '@porsche-design-system/examples-stories/components/fieldset/accessibility/unlabeled-field-group/example';
import {
  fieldsetSlotStories,
  fieldsetStory,
} from '@porsche-design-system/examples-stories/components/fieldset/default/story';
import RequiredDescription from '@porsche-design-system/examples-stories/components/fieldset/required/example.mdx';
import { fieldsetStoryRequired } from '@porsche-design-system/examples-stories/components/fieldset/required/story';
import SlottedLabelDescription from '@porsche-design-system/examples-stories/components/fieldset/slotted-label/example.mdx';
import { fieldsetStorySlottedLabel } from '@porsche-design-system/examples-stories/components/fieldset/slotted-label/story';
import SlottedMessageDescription from '@porsche-design-system/examples-stories/components/fieldset/slotted-message/example.mdx';
import { fieldsetStorySlottedMessage } from '@porsche-design-system/examples-stories/components/fieldset/slotted-message/story';
import AccessibilityOverview from '@/app/(main)/components/fieldset/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/fieldset/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/fieldset/configurator/introduction.mdx';
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
