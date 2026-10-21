import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/icon/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/icon/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/icon/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/icon/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const iconMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/icon/default',
  examples: [
    'components/icon/overview',
    'components/icon/size',
    'components/icon/size-css-var',
    'components/icon/responsive-size',
    'components/icon/color',
    'components/icon/color-css-var',
    'components/icon/custom',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/icon/accessibility/meaningful-icon-without-accessible-name',
      'components/icon/accessibility/decorative-icon-with-redundant-label',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-icon'],
} satisfies ComponentDocsMeta<'p-icon'>;
