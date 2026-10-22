import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/popover/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/popover/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/popover/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/popover/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const popoverMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/popover/default',
  examples: ['components/popover/slotted-button'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/popover/accessibility/aria-on-component-host-vs-aria-prop',
      'components/popover/accessibility/custom-slotted-trigger-without-accessible-name',
      'components/popover/accessibility/custom-slotted-trigger-without-aria-expanded',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-popover'],
} satisfies ComponentDocsMeta<'p-popover'>;
