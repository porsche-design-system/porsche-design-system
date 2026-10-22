import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/modal/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/modal/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/modal/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/modal/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const modalMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/modal/default',
  examples: ['components/modal/scrollable', 'components/modal/alert-dialog', 'components/modal/custom-styling'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/modal/accessibility/aria-on-component-host-vs-aria-prop',
      'components/modal/accessibility/dialog-label-on-component-host-vs-header-slot',
      'components/modal/accessibility/modal-trigger-without-popup-semantics-or-context',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-modal'],
} satisfies ComponentDocsMeta<'p-modal'>;
