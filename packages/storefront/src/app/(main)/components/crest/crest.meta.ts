import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/crest/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/crest/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/crest/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/crest/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const crestMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/crest/default',
  examples: ['components/crest/link', 'components/crest/custom-clickable-area'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: ['components/crest/accessibility/aria-on-component-host-vs-aria-prop'],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-crest'],
} satisfies ComponentDocsMeta<'p-crest'>;
