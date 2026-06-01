import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/tag/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/tag/configurator/introduction.mdx';
import { tagStory } from '@/app/components/tag/configurator/story';
import MultilineDescription from '@/app/components/tag/examples/multiline/example.mdx';
import { tagStoryMultiline } from '@/app/components/tag/examples/multiline/story';
import SlottedButtonDescription from '@/app/components/tag/examples/slotted-button/example.mdx';
import { tagStorySlottedButton } from '@/app/components/tag/examples/slotted-button/story';
import SlottedLinkDescription from '@/app/components/tag/examples/slotted-link/example.mdx';
import { tagStorySlottedLink } from '@/app/components/tag/examples/slotted-link/story';
import Usage from '@/app/components/tag/usage/page.mdx';
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
  accessibility: Accessibility,
  api: componentMeta['p-tag'],
} satisfies ComponentDocsMeta<'p-tag'>;

