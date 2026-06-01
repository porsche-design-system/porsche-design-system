import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/canvas/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/canvas/configurator/introduction.mdx';
import { canvasStory } from '@/app/components/canvas/configurator/story';
import Usage from '@/app/components/canvas/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const canvasMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: canvasStory,
  },
  examples: {},
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-canvas'],
} satisfies ComponentDocsMeta<'p-canvas'>;

