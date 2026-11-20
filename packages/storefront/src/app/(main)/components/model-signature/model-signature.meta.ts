import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/model-signature/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/model-signature/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/model-signature/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/model-signature/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const modelSignatureMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/model-signature/default',
  examples: [
    'components/model-signature/safe-zone',
    'components/model-signature/mask-blend-mode',
    'components/model-signature/mask-image',
    'components/model-signature/mask-video',
    'components/model-signature/custom-styling',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-model-signature'],
} satisfies ComponentDocsMeta<'p-model-signature'>;
