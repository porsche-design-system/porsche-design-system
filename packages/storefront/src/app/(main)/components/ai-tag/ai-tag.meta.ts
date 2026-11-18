import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/ai-tag/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/ai-tag/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/ai-tag/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/ai-tag/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const aiTagMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/ai-tag/default',
  examples: [
    'components/ai-tag/within-checkbox',
    'components/ai-tag/within-radio-group',
    'components/ai-tag/within-form-label',
    'components/ai-tag/within-input-search',
    'components/ai-tag/within-text',
    'components/ai-tag/within-image',
    'components/ai-tag/within-table',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-ai-tag'],
} satisfies ComponentDocsMeta<'p-ai-tag'>;
