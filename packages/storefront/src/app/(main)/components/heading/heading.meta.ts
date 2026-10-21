import { componentMeta } from '@porsche-design-system/component-meta';
import { skippedHeadingLevelA11yExample } from '@porsche-design-system/examples-stories/components/heading/accessibility/skipped-heading-level/example';
import ColorDescription from '@porsche-design-system/examples-stories/components/heading/color/example.mdx';
import { headingStoryCustomColor } from '@porsche-design-system/examples-stories/components/heading/color/story';
import { headingStory } from '@porsche-design-system/examples-stories/components/heading/default/story';
import SemanticsDescription from '@porsche-design-system/examples-stories/components/heading/semantics/example.mdx';
import { headingStorySemantics } from '@porsche-design-system/examples-stories/components/heading/semantics/story';
import AccessibilityOverview from '@/app/(main)/components/heading/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/heading/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/heading/configurator/introduction.mdx';
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
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      skippedHeadingLevel: skippedHeadingLevelA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-heading'],
} satisfies ComponentDocsMeta<'p-heading'>;
