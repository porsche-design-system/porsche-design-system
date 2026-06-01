import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/pagination/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/pagination/configurator/introduction.mdx';
import { paginationStory } from '@/app/components/pagination/configurator/story';
import Usage from '@/app/components/pagination/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const paginationMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: paginationStory,
  },
  examples: {},
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-pagination'],
} satisfies ComponentDocsMeta<'p-pagination'>;

