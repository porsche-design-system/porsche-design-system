import { componentMeta } from '@porsche-design-system/component-meta';
import { statusConveyedByColorAndIconOnlyA11yExample } from '@/app/(main)/components/tag/accessibility/examples/status-conveyed-by-color-and-icon-only/example';
import AccessibilityOverview from '@/app/(main)/components/tag/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tag/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tag/configurator/introduction.mdx';
import { tagStory } from '@/app/(main)/components/tag/configurator/story';
import MultilineDescription from '@/app/(main)/components/tag/examples/multiline/example.mdx';
import { tagStoryMultiline } from '@/app/(main)/components/tag/examples/multiline/story';
import SlottedButtonDescription from '@/app/(main)/components/tag/examples/slotted-button/example.mdx';
import { tagStorySlottedButton } from '@/app/(main)/components/tag/examples/slotted-button/story';
import SlottedLinkDescription from '@/app/(main)/components/tag/examples/slotted-link/example.mdx';
import { tagStorySlottedLink } from '@/app/(main)/components/tag/examples/slotted-link/story';
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
