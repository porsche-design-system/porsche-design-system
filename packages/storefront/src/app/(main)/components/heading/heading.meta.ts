import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/(main)/components/heading/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/heading/configurator/introduction.mdx';
import { headingStory } from '@/app/(main)/components/heading/configurator/story';
import ColorDescription from '@/app/(main)/components/heading/examples/color/example.mdx';
import { headingStoryCustomColor } from '@/app/(main)/components/heading/examples/color/story';
import SemanticsDescription from '@/app/(main)/components/heading/examples/semantics/example.mdx';
import { headingStorySemantics } from '@/app/(main)/components/heading/examples/semantics/story';
import Usage from '@/app/(main)/components/heading/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const headingMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: headingStory,
  },
  examples: {
    semantics: {
      kind: 'story',
      name: 'Semantics',
      description: SemanticsDescription,
      story: headingStorySemantics,
    },
    color: {
      kind: 'story',
      name: 'Color',
      description: ColorDescription,
      story: headingStoryCustomColor,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-heading'],
} satisfies ComponentDocsMeta<'p-heading'>;

