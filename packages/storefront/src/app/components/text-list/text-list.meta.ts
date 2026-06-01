import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/text-list/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/text-list/configurator/introduction.mdx';
import { textListStory } from '@/app/components/text-list/configurator/story';
import Usage from '@/app/components/text-list/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const textListMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: textListStory,
  },
  examples: {},
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-text-list'],
} satisfies ComponentDocsMeta<'p-text-list'>;

