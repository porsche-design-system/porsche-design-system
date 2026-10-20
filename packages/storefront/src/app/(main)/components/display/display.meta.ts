import { componentMeta } from '@porsche-design-system/component-meta';
import ColorDescription from '@porsche-design-system/examples-stories/components/display/color/example.mdx';
import { displayStoryColorInherit } from '@porsche-design-system/examples-stories/components/display/color/story';
import { displayStory } from '@porsche-design-system/examples-stories/components/display/default/story';
import SemanticsDescription from '@porsche-design-system/examples-stories/components/display/semantics/example.mdx';
import { displayStorySemantics } from '@porsche-design-system/examples-stories/components/display/semantics/story';
import SizeDescription from '@porsche-design-system/examples-stories/components/display/size/example.mdx';
import { displayStorySizeInherit } from '@porsche-design-system/examples-stories/components/display/size/story';
import { displayStorySizeResponsive } from '@porsche-design-system/examples-stories/components/display/size-responsive/story';
import AccessibilityOverview from '@/app/(main)/components/display/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/display/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/display/configurator/introduction.mdx';
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
  accessibility: {
    overview: AccessibilityOverview,
    examples: {},
    tests: AccessibilityTests,
  },
  api: componentMeta['p-display'],
} satisfies ComponentDocsMeta<'p-display'>;
