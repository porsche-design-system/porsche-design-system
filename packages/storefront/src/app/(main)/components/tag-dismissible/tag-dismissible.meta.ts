import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/tag-dismissible/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tag-dismissible/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tag-dismissible/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/tag-dismissible/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tagDismissibleMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/tag-dismissible/default',
  examples: [],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/tag-dismissible/accessibility/dismiss-button-aria-on-host-vs-aria-prop',
      'components/tag-dismissible/accessibility/tag-without-descriptive-label',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-tag-dismissible'],
} satisfies ComponentDocsMeta<'p-tag-dismissible'>;
