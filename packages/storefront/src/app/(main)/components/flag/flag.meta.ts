import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/flag/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/flag/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/flag/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/flag/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const flagMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/flag/default',
  examples: ['components/flag/size', 'components/flag/size-css-var', 'components/flag/responsive-size'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/flag/accessibility/informative-flag-without-accessible-name',
      'components/flag/accessibility/decorative-flag-with-redundant-label',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-flag'],
} satisfies ComponentDocsMeta<'p-flag'>;
