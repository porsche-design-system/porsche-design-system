import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/scroller/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/scroller/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/scroller/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/scroller/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const scrollerMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/scroller/default',
  examples: ['components/scroller/height', 'components/scroller/scroll-to-position'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: ['components/scroller/accessibility/aria-on-component-host-vs-aria-prop'],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-scroller'],
} satisfies ComponentDocsMeta<'p-scroller'>;
