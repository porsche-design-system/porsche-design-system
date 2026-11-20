import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/text/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/text/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/text/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/text/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const textMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/text/default',
  examples: ['components/text/size', 'components/text/size-responsive', 'components/text/semantics'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: ['components/text/accessibility/heading-tag-used-for-styling-only'],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-text'],
} satisfies ComponentDocsMeta<'p-text'>;
