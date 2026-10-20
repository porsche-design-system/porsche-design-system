import { componentMeta } from '@porsche-design-system/component-meta';
import { headingTagUsedForStylingOnlyA11yExample } from '@porsche-design-system/examples-accessibility/components/text/accessibility/heading-tag-used-for-styling-only/example';
import { textStory } from '@porsche-design-system/examples-stories/components/text/default/story';
import ResponsiveDescription from '@porsche-design-system/examples-stories/components/text/responsive/example.mdx';
import { textStorySizeResponsive } from '@porsche-design-system/examples-stories/components/text/responsive/story';
import SemanticsDescription from '@porsche-design-system/examples-stories/components/text/semantics/example.mdx';
import { textStorySemantics } from '@porsche-design-system/examples-stories/components/text/semantics/story';
import SizeDescription from '@porsche-design-system/examples-stories/components/text/size/example.mdx';
import { textStorySize } from '@porsche-design-system/examples-stories/components/text/size/story';
import AccessibilityOverview from '@/app/(main)/components/text/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/text/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/text/configurator/introduction.mdx';
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
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      headingTagUsedForStylingOnly: headingTagUsedForStylingOnlyA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-text'],
} satisfies ComponentDocsMeta<'p-text'>;
