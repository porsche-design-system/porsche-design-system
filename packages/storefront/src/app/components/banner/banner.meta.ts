import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/banner/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/banner/configurator/introduction.mdx';
import { bannerStory } from '@/app/components/banner/configurator/story';
import CustomizationDescription from '@/app/components/banner/examples/customization/example.mdx';
import { bannerStoryCustomStyling } from '@/app/components/banner/examples/customization/story';
import Usage from '@/app/components/banner/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const bannerMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: bannerStory,
  },
  examples: {
    customization: {
      kind: 'story',
      name: 'Customization',
      description: CustomizationDescription,
      story: bannerStoryCustomStyling,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-banner'],
} satisfies ComponentDocsMeta<'p-banner'>;

