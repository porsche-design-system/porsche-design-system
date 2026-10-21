import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/sheet/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/sheet/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/sheet/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/sheet/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const sheetMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/sheet/default',
  examples: [],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/sheet/accessibility/aria-on-trigger-button-host-vs-aria-prop',
      'components/sheet/accessibility/dialog-label-on-component-host-vs-header-slot',
      'components/sheet/accessibility/sheet-trigger-without-popup-semantics',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-sheet'],
} satisfies ComponentDocsMeta<'p-sheet'>;
