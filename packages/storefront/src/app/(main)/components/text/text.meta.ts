import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/(main)/components/text/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/text/configurator/introduction.mdx';
import { textStory } from '@/app/(main)/components/text/configurator/story';
import SemanticsDescription from '@/app/(main)/components/text/examples/semantics/example.mdx';
import { textStorySemantics } from '@/app/(main)/components/text/examples/semantics/story';
import ResponsiveDescription from '@/app/(main)/components/text/examples/responsive/example.mdx';
import { textStorySizeResponsive } from '@/app/(main)/components/text/examples/responsive/story';
import SizeDescription from '@/app/(main)/components/text/examples/size/example.mdx';
import { textStorySize } from '@/app/(main)/components/text/examples/size/story';
import Usage from '@/app/(main)/components/text/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const textMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: textStory,
  },
  examples: {
    size: {
      kind: 'story',
      name: 'Static Size',
      description: SizeDescription,
      story: textStorySize,
    },
    sizeResponsive: {
      kind: 'story',
      name: 'Responsive Size',
      description: ResponsiveDescription,
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

