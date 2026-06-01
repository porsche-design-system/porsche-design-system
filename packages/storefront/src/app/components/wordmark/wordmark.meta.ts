import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/wordmark/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/wordmark/configurator/introduction.mdx';
import { wordmarkStory } from '@/app/components/wordmark/configurator/story';
import CustomClickableAreaDescription from '@/app/components/wordmark/examples/custom-clickable-area/example.mdx';
import { wordmarkStoryCustomPadding } from '@/app/components/wordmark/examples/custom-clickable-area/story';
import SizeDescription from '@/app/components/wordmark/examples/size/example.mdx';
import { wordmarkStorySizeInherit } from '@/app/components/wordmark/examples/size/story';
import Usage from '@/app/components/wordmark/usage/page.mdx';
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

