import { componentMeta } from '@porsche-design-system/component-meta';
import { canvasExample } from '@porsche-design-system/examples-framework';
import AccessibilityOverview from '@/app/(main)/components/canvas/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/canvas/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/canvas/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/canvas/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const canvasMeta = {
  introduction: IntroductionDescription,
  configurator: {
    example: canvasExample,
  },
  examples: {},
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {},
    tests: AccessibilityTests,
  },
  api: componentMeta['p-canvas'],
} satisfies ComponentDocsMeta<'p-canvas'>;
