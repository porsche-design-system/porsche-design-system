import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/button/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/button/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/button/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/button/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const buttonMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/button/default',
  examples: [
    'components/button/form',
    'components/button/form-attribute',
    'components/button/ai-drop-shadow',
    'components/button/ai-gradient-glow',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/button/accessibility/aria-on-component-host-vs-aria-prop',
      'components/button/accessibility/icon-only-button-without-accessible-name',
      'components/button/accessibility/vague-button-label-without-context',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-button'],
} satisfies ComponentDocsMeta<'p-button'>;
