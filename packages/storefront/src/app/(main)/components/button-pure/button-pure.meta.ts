import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/button-pure/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/button-pure/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/button-pure/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/button-pure/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const buttonPureMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/button-pure/default',
  examples: [
    'components/button-pure/custom-clickable-area',
    'components/button-pure/form',
    'components/button-pure/form-attribute',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/button-pure/accessibility/aria-on-component-host-vs-aria-prop',
      'components/button-pure/accessibility/icon-only-button-without-accessible-name',
      'components/button-pure/accessibility/vague-button-label-without-context',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-button-pure'],
} satisfies ComponentDocsMeta<'p-button-pure'>;
