import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/link/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/link/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/link/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/link/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const linkMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/link/default',
  examples: ['components/link/framework-routing', 'components/link/icon'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/link/accessibility/aria-on-component-host-vs-aria-prop',
      'components/link/accessibility/icon-only-link-without-accessible-name',
      'components/link/accessibility/indicating-the-current-page',
      'components/link/accessibility/vague-link-label-without-context',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-link'],
} satisfies ComponentDocsMeta<'p-link'>;
