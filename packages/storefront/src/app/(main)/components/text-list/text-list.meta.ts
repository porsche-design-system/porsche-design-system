import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/text-list/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/text-list/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/text-list/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/text-list/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const textListMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/text-list/default',
  examples: [],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: ['components/text-list/accessibility/numbered-list-for-non-sequential-items'],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-text-list'],
} satisfies ComponentDocsMeta<'p-text-list'>;
