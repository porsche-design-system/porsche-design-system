import { componentMeta } from '@porsche-design-system/component-meta';
import { statusConveyedByColorAndIconOnlyA11yExample } from '@porsche-design-system/examples-accessibility/components/tag/accessibility/status-conveyed-by-color-and-icon-only/example';
import { tagStory } from '@porsche-design-system/examples-stories/components/tag/default/story';
import MultilineDescription from '@porsche-design-system/examples-stories/components/tag/multiline/example.mdx';
import { tagStoryMultiline } from '@porsche-design-system/examples-stories/components/tag/multiline/story';
import SlottedButtonDescription from '@porsche-design-system/examples-stories/components/tag/slotted-button/example.mdx';
import { tagStorySlottedButton } from '@porsche-design-system/examples-stories/components/tag/slotted-button/story';
import SlottedLinkDescription from '@porsche-design-system/examples-stories/components/tag/slotted-link/example.mdx';
import { tagStorySlottedLink } from '@porsche-design-system/examples-stories/components/tag/slotted-link/story';
import AccessibilityOverview from '@/app/(main)/components/tag/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tag/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tag/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/tag/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tagMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: tagStory,
  },
  examples: {
    slottedButton: {
      kind: 'story',
      name: 'With slotted button',
      description: SlottedButtonDescription,
      story: tagStorySlottedButton,
    },
    slottedLink: {
      kind: 'story',
      name: 'With slotted link',
      description: SlottedLinkDescription,
      story: tagStorySlottedLink,
    },
    multiline: {
      kind: 'story',
      name: 'Multiline',
      description: MultilineDescription,
      story: tagStoryMultiline,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      statusConveyedByColorAndIconOnly: statusConveyedByColorAndIconOnlyA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-tag'],
} satisfies ComponentDocsMeta<'p-tag'>;
