import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/icon/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/icon/configurator/introduction.mdx';
import { iconStory } from '@/app/components/icon/configurator/story';
import ColorDescription from '@/app/components/icon/examples/color/example.mdx';
import { iconStoryColor, iconStoryColorCSSVar } from '@/app/components/icon/examples/color/story';
import CustomDescription from '@/app/components/icon/examples/custom/example.mdx';
import { iconStoryCustom } from '@/app/components/icon/examples/custom/story';
import OverviewDescription from '@/app/components/icon/examples/overview/example.mdx';
import { iconStoryOverview } from '@/app/components/icon/examples/overview/story';
import SizeDescription from '@/app/components/icon/examples/size/example.mdx';
import {
  iconStoryResponsiveSize,
  iconStorySize,
  iconStorySizeCSSVar,
} from '@/app/components/icon/examples/size/story';
import Usage from '@/app/components/icon/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const iconMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: iconStory,
  },
  examples: {
    overview: {
      kind: 'story',
      name: 'Overview',
      description: OverviewDescription,
      story: iconStoryOverview,
    },
    size: {
      kind: 'story',
      name: 'Size',
      description: SizeDescription,
      story: iconStorySize,
    },
    sizeCssVar: {
      kind: 'story',
      name: 'Size via CSS Variable',
      story: iconStorySizeCSSVar,
    },
    responsiveSize: {
      kind: 'story',
      name: 'Responsive Size',
      story: iconStoryResponsiveSize,
    },
    color: {
      kind: 'story',
      name: 'Color',
      description: ColorDescription,
      story: iconStoryColor,
    },
    colorCssVar: {
      kind: 'story',
      name: 'Color via CSS Variable',
      story: iconStoryColorCSSVar,
    },
    custom: {
      kind: 'story',
      name: 'Custom icon',
      description: CustomDescription,
      story: iconStoryCustom,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-icon'],
} satisfies ComponentDocsMeta<'p-icon'>;

