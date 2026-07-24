import { componentMeta } from '@porsche-design-system/component-meta';
import { canvasExample } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/canvas/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/canvas/configurator/introduction.mdx';
import { canvasStory } from '@/app/(main)/components/canvas/configurator/story';
import Usage from '@/app/(main)/components/canvas/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const canvasMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: canvasStory,
    example: canvasExample,
  },
  examples: {},
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-canvas'],
} satisfies ComponentDocsMeta<'p-canvas'>;
