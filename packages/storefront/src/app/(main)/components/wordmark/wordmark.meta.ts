import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/(main)/components/wordmark/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/wordmark/configurator/introduction.mdx';
import { wordmarkStory } from '@/app/(main)/components/wordmark/configurator/story';
import CustomClickableAreaDescription from '@/app/(main)/components/wordmark/examples/custom-clickable-area/example.mdx';
import { wordmarkStoryCustomPadding } from '@/app/(main)/components/wordmark/examples/custom-clickable-area/story';
import SizeDescription from '@/app/(main)/components/wordmark/examples/size/example.mdx';
import { wordmarkStorySizeInherit } from '@/app/(main)/components/wordmark/examples/size/story';
import Usage from '@/app/(main)/components/wordmark/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const wordmarkMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: wordmarkStory,
  },
  examples: {
    size: {
      kind: 'story',
      name: 'Size',
      description: SizeDescription,
      story: wordmarkStorySizeInherit,
    },
    customClickableArea: {
      kind: 'story',
      name: 'Custom clickable/focusable area',
      description: CustomClickableAreaDescription,
      story: wordmarkStoryCustomPadding,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-wordmark'],
} satisfies ComponentDocsMeta<'p-wordmark'>;

