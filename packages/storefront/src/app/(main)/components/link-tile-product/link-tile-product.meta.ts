import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/link-tile-product/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/link-tile-product/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/link-tile-product/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/link-tile-product/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const linkTileProductMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/link-tile-product/default',
  examples: ['components/link-tile-product/framework-routing'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-link-tile-product'],
} satisfies ComponentDocsMeta<'p-link-tile-product'>;
