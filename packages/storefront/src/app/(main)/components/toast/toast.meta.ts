import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/(main)/components/toast/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/toast/configurator/introduction.mdx';
import { toastStory } from '@/app/(main)/components/toast/configurator/story';
import Usage from '@/app/(main)/components/toast/usage/page.mdx';
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

