import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/toast/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/toast/configurator/introduction.mdx';
import { toastStory } from '@/app/components/toast/configurator/story';
import Usage from '@/app/components/toast/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const toastMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: toastStory,
  },
  examples: {},
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-toast'],
} satisfies ComponentDocsMeta<'p-toast'>;

