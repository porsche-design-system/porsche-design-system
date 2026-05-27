import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/spinner/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/spinner/configurator/introduction.mdx';
import { spinnerStory } from '@/app/components/spinner/configurator/story';
import ColorCssVarDescription from '@/app/components/spinner/examples/color-css-var/example.mdx';
import { spinnerStoryColorCSSVar } from '@/app/components/spinner/examples/color-css-var/story';
import ColorDescription from '@/app/components/spinner/examples/color/example.mdx';
import { spinnerStoryColor } from '@/app/components/spinner/examples/color/story';
import ResponsiveSizeDescription from '@/app/components/spinner/examples/responsive-size/example.mdx';
import { spinnerStoryResponsiveSize } from '@/app/components/spinner/examples/responsive-size/story';
import SizeCssVarDescription from '@/app/components/spinner/examples/size-css-var/example.mdx';
import { spinnerStorySizeCSSVar } from '@/app/components/spinner/examples/size-css-var/story';
import SizeDescription from '@/app/components/spinner/examples/size/example.mdx';
import { spinnerStorySize } from '@/app/components/spinner/examples/size/story';
import Usage from '@/app/components/spinner/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const spinnerMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: spinnerStory,
  },
  examples: {
    size: {
      kind: 'story',
      name: 'Size',
      description: SizeDescription,
      story: spinnerStorySize,
    },
    sizeCssVar: {
      kind: 'story',
      name: 'Size via CSS Variable',
      description: SizeCssVarDescription,
      story: spinnerStorySizeCSSVar,
    },
    responsiveSize: {
      kind: 'story',
      name: 'Responsive Size',
      description: ResponsiveSizeDescription,
      story: spinnerStoryResponsiveSize,
    },
    color: {
      kind: 'story',
      name: 'Color',
      description: ColorDescription,
      story: spinnerStoryColor,
    },
    colorCssVar: {
      kind: 'story',
      name: 'Color via CSS Variable',
      description: ColorCssVarDescription,
      story: spinnerStoryColorCSSVar,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-spinner'],
} satisfies ComponentDocsMeta<'p-spinner'>;

