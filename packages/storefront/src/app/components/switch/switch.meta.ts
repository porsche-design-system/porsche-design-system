import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/switch/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/switch/configurator/introduction.mdx';
import { switchStory } from '@/app/components/switch/configurator/story';
import Usage from '@/app/components/switch/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const switchMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: switchStory,
  },
  examples: {},
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-switch'],
} satisfies ComponentDocsMeta<'p-switch'>;

