import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/crest/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/crest/configurator/introduction.mdx';
import { crestStory } from '@/app/components/crest/configurator/story';
import CustomClickableAreaDescription from '@/app/components/crest/examples/custom-clickable-area/example.mdx';
import { crestStoryCustomPadding } from '@/app/components/crest/examples/custom-clickable-area/story';
import LinkDescription from '@/app/components/crest/examples/link/example.mdx';
import { crestStoryLink } from '@/app/components/crest/examples/link/story';
import Usage from '@/app/components/crest/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const crestMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: crestStory,
  },
  examples: {
    link: {
      kind: 'story',
      name: 'Link',
      description: LinkDescription,
      story: crestStoryLink,
    },
    customClickableArea: {
      kind: 'story',
      name: 'Custom clickable/focusable area',
      description: CustomClickableAreaDescription,
      story: crestStoryCustomPadding,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-crest'],
} satisfies ComponentDocsMeta<'p-crest'>;

