import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/table/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/table/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/table/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/table/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tableMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/table/default',
  examples: [
    'components/table/caption-property',
    'components/table/caption-slot',
    'components/table/layout-fixed',
    'components/table/sorting',
    'components/table/hide-label',
    'components/table/advanced',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/table/accessibility/data-table-without-caption',
      'components/table/accessibility/column-with-hidden-label',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-table'],
} satisfies ComponentDocsMeta<'p-table'>;
