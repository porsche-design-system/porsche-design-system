import { componentMeta } from '@porsche-design-system/component-meta';
import { headingTagUsedForStylingOnlyA11yExample } from '@/app/(main)/components/text/accessibility/examples/heading-tag-used-for-styling-only/example';
import AccessibilityOverview from '@/app/(main)/components/text/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/text/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/text/configurator/introduction.mdx';
import { textStory } from '@/app/(main)/components/text/configurator/story';
import ResponsiveDescription from '@/app/(main)/components/text/examples/responsive/example.mdx';
import { textStorySizeResponsive } from '@/app/(main)/components/text/examples/responsive/story';
import SemanticsDescription from '@/app/(main)/components/text/examples/semantics/example.mdx';
import { textStorySemantics } from '@/app/(main)/components/text/examples/semantics/story';
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
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      headingTagUsedForStylingOnly: headingTagUsedForStylingOnlyA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-text'],
} satisfies ComponentDocsMeta<'p-text'>;
