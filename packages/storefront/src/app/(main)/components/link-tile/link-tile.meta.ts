import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/link-tile/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/link-tile/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/link-tile/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/link-tile/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const linkTileMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/link-tile/default',
  examples: [
    'components/link-tile/with-video',
    'components/link-tile/ui-behaviour',
    'components/link-tile/hyphens',
    'components/link-tile/footer-slot',
    'components/link-tile/color-scheme',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/link-tile/accessibility/aria-on-component-host-vs-aria-prop',
      'components/link-tile/accessibility/vague-link-label-without-context',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-link-tile'],
} satisfies ComponentDocsMeta<'p-link-tile'>;
