import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/text/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/text/configurator/introduction.mdx';
import { textStory } from '@/app/components/text/configurator/story';
import SemanticsDescription from '@/app/components/text/examples/semantics/example.mdx';
import { textStorySemantics } from '@/app/components/text/examples/semantics/story';
import SizeDescription from '@/app/components/text/examples/size/example.mdx';
import { textStorySize, textStorySizeResponsive } from '@/app/components/text/examples/size/story';
import Usage from '@/app/components/text/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const textMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: textStory,
  },
  examples: {
    size: {
      kind: 'story',
      name: 'Size',
      description: SizeDescription,
      story: textStorySize,
    },
    sizeResponsive: {
      kind: 'story',
      name: 'Responsive',
      story: textStorySizeResponsive,
    },
    semantics: {
      kind: 'story',
      name: 'Semantics',
      description: SemanticsDescription,
      story: textStorySemantics,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-text'],
} satisfies ComponentDocsMeta<'p-text'>;

