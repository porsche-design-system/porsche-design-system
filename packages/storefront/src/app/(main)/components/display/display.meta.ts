import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/display/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/display/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/display/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/display/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const displayMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/display/default',
  examples: [
    'components/display/size',
    'components/display/size-responsive',
    'components/display/semantics',
    'components/display/color',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-display'],
} satisfies ComponentDocsMeta<'p-display'>;
