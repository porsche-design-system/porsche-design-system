import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/button-tile/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/button-tile/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/button-tile/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/button-tile/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const buttonTileMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/button-tile/default',
  examples: [
    'components/button-tile/ui-behaviour',
    'components/button-tile/hyphens',
    'components/button-tile/footer-slot',
    'components/button-tile/color-scheme',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/button-tile/accessibility/aria-on-component-host-vs-aria-prop',
      'components/button-tile/accessibility/vague-tile-label-without-context',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-button-tile'],
} satisfies ComponentDocsMeta<'p-button-tile'>;
