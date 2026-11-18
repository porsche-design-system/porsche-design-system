import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/pagination/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/pagination/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/pagination/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/pagination/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const paginationMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/pagination/default',
  examples: [],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: ['components/pagination/accessibility/default-english-labels-on-a-localized-page'],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-pagination'],
} satisfies ComponentDocsMeta<'p-pagination'>;
