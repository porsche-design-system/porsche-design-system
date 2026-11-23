import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/tag/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tag/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tag/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/tag/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tagMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/tag/default',
  examples: ['components/tag/slotted-button', 'components/tag/slotted-link', 'components/tag/multiline'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: ['components/tag/accessibility/status-conveyed-by-color-and-icon-only'],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-tag'],
} satisfies ComponentDocsMeta<'p-tag'>;
