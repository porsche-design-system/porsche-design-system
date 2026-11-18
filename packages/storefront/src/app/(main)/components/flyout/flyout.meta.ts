import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/flyout/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/flyout/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/flyout/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/flyout/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const flyoutMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/flyout/default',
  examples: ['components/flyout/sticky-top', 'components/flyout/form', 'components/flyout/custom-styling'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/flyout/accessibility/aria-on-trigger-button-host-vs-aria-prop',
      'components/flyout/accessibility/dialog-label-on-component-host-vs-header-slot',
      'components/flyout/accessibility/flyout-trigger-without-popup-semantics',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-flyout'],
} satisfies ComponentDocsMeta<'p-flyout'>;
