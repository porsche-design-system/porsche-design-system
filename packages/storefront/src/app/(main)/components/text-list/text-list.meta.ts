import { componentMeta } from '@porsche-design-system/component-meta';
import { numberedListForNonSequentialItemsA11yExample } from '@porsche-design-system/examples-accessibility/components/text-list/accessibility/numbered-list-for-non-sequential-items/example';
import { textListStory } from '@porsche-design-system/examples-stories/components/text-list/default/story';
import AccessibilityOverview from '@/app/(main)/components/text-list/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/text-list/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/text-list/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/text-list/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const textListMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: textListStory,
  },
  examples: {},
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      numberedListForNonSequentialItems: numberedListForNonSequentialItemsA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-text-list'],
} satisfies ComponentDocsMeta<'p-text-list'>;
