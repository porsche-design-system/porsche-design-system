import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/(main)/components/display/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/display/configurator/introduction.mdx';
import { displayStory } from '@/app/(main)/components/display/configurator/story';
import ColorDescription from '@/app/(main)/components/display/examples/color/example.mdx';
import { displayStoryColorInherit } from '@/app/(main)/components/display/examples/color/story';
import SemanticsDescription from '@/app/(main)/components/display/examples/semantics/example.mdx';
import { displayStorySemantics } from '@/app/(main)/components/display/examples/semantics/story';
import SizeDescription from '@/app/(main)/components/display/examples/size/example.mdx';
import { displayStorySizeInherit, displayStorySizeResponsive } from '@/app/(main)/components/display/examples/size/story';
import Usage from '@/app/(main)/components/display/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const displayMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: displayStory,
  },
  examples: {
    size: {
      kind: 'story',
      name: 'Size',
      description: SizeDescription,
      story: displayStorySizeInherit,
    },
    sizeResponsive: {
      kind: 'story',
      name: 'Responsive',
      story: displayStorySizeResponsive,
    },
    semantics: {
      kind: 'story',
      name: 'Semantics',
      description: SemanticsDescription,
      story: displayStorySemantics,
    },
    color: {
      kind: 'story',
      name: 'Color',
      description: ColorDescription,
      story: displayStoryColorInherit,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-display'],
} satisfies ComponentDocsMeta<'p-display'>;

