import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/tag-dismissible/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/tag-dismissible/configurator/introduction.mdx';
import { tagDismissibleStory } from '@/app/components/tag-dismissible/configurator/story';
import Usage from '@/app/components/tag-dismissible/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tagDismissibleMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: tagDismissibleStory,
  },
  examples: {},
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-tag-dismissible'],
} satisfies ComponentDocsMeta<'p-tag-dismissible'>;

