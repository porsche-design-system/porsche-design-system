import { componentMeta } from '@porsche-design-system/component-meta';
import { dividerAsTheOnlySectionSeparatorA11yExample } from '@porsche-design-system/examples-stories/components/divider/accessibility/divider-as-the-only-section-separator/example';
import { dividerStory } from '@porsche-design-system/examples-stories/components/divider/default/story';
import ResponsiveDescription from '@porsche-design-system/examples-stories/components/divider/responsive/example.mdx';
import { dividerStoryResponsive } from '@porsche-design-system/examples-stories/components/divider/responsive/story';
import VerticalDescription from '@porsche-design-system/examples-stories/components/divider/vertical/example.mdx';
import { dividerStoryVertical } from '@porsche-design-system/examples-stories/components/divider/vertical/story';
import AccessibilityOverview from '@/app/(main)/components/divider/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/divider/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/divider/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/divider/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const dividerMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: dividerStory,
  },
  examples: {
    vertical: {
      kind: 'story',
      name: 'Vertical',
      description: VerticalDescription,
      story: dividerStoryVertical,
    },
    responsive: {
      kind: 'story',
      name: 'Responsive',
      description: ResponsiveDescription,
      story: dividerStoryResponsive,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      dividerAsTheOnlySectionSeparator: dividerAsTheOnlySectionSeparatorA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-divider'],
} satisfies ComponentDocsMeta<'p-divider'>;
