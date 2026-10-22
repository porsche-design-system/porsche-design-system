import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/wordmark/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/wordmark/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/wordmark/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/wordmark/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const wordmarkMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/wordmark/default',
  examples: ['components/wordmark/size', 'components/wordmark/custom-clickable-area'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/wordmark/accessibility/aria-on-component-host-vs-aria-prop',
      'components/wordmark/accessibility/linked-wordmark-without-accessible-name',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-wordmark'],
} satisfies ComponentDocsMeta<'p-wordmark'>;
