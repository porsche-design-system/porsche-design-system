import { componentMeta } from '@porsche-design-system/component-meta';
import { defaultEnglishLabelsOnALocalizedPageA11yExample } from '@/app/(main)/components/pagination/accessibility/examples/default-english-labels-on-a-localized-page/example';
import AccessibilityOverview from '@/app/(main)/components/pagination/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/pagination/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/pagination/configurator/introduction.mdx';
import { paginationStory } from '@/app/(main)/components/pagination/configurator/story';
import Usage from '@/app/(main)/components/pagination/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const paginationMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: paginationStory,
  },
  examples: {},
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      defaultEnglishLabelsOnALocalizedPage: defaultEnglishLabelsOnALocalizedPageA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-pagination'],
} satisfies ComponentDocsMeta<'p-pagination'>;
