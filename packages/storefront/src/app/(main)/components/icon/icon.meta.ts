import { componentMeta } from '@porsche-design-system/component-meta';
import { decorativeIconWithRedundantLabelA11yExample } from '@/app/(main)/components/icon/accessibility/examples/decorative-icon-with-redundant-label/example';
import { meaningfulIconWithoutAccessibleNameA11yExample } from '@/app/(main)/components/icon/accessibility/examples/meaningful-icon-without-accessible-name/example';
import AccessibilityOverview from '@/app/(main)/components/icon/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/icon/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/icon/configurator/introduction.mdx';
import { iconStory } from '@/app/(main)/components/icon/configurator/story';
import ColorDescription from '@/app/(main)/components/icon/examples/color/example.mdx';
import { iconStoryColor } from '@/app/(main)/components/icon/examples/color/story';
import ColorCssVarDescription from '@/app/(main)/components/icon/examples/color-css-var/example.mdx';
import { iconStoryColorCSSVar } from '@/app/(main)/components/icon/examples/color-css-var/story';
import CustomDescription from '@/app/(main)/components/icon/examples/custom/example.mdx';
import { iconStoryCustom } from '@/app/(main)/components/icon/examples/custom/story';
import OverviewDescription from '@/app/(main)/components/icon/examples/overview/example.mdx';
import { iconStoryOverview } from '@/app/(main)/components/icon/examples/overview/story';
import ResponsiveSizeDescription from '@/app/(main)/components/icon/examples/responsive-size/example.mdx';
import { iconStoryResponsiveSize } from '@/app/(main)/components/icon/examples/responsive-size/story';
import SizeDescription from '@/app/(main)/components/icon/examples/size/example.mdx';
import { iconStorySize } from '@/app/(main)/components/icon/examples/size/story';
import SizeCssVarDescription from '@/app/(main)/components/icon/examples/size-css-var/example.mdx';
import { iconStorySizeCSSVar } from '@/app/(main)/components/icon/examples/size-css-var/story';
import Usage from '@/app/(main)/components/icon/usage/page.mdx';
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
      name: 'Size via Prop',
      description: SizeDescription,
      story: iconStorySize,
    },
    sizeCssVar: {
      kind: 'story',
      name: 'Size via CSS Variable',
      description: SizeCssVarDescription,
      story: iconStorySizeCSSVar,
    },
    responsiveSize: {
      kind: 'story',
      name: 'Responsive Size',
      description: ResponsiveSizeDescription,
      story: iconStoryResponsiveSize,
    },
    color: {
      kind: 'story',
      name: 'Color via Prop',
      description: ColorDescription,
      story: iconStoryColor,
    },
    colorCssVar: {
      kind: 'story',
      name: 'Color via CSS Variable',
      description: ColorCssVarDescription,
      story: iconStoryColorCSSVar,
    },
    custom: {
      kind: 'story',
      name: 'Custom Icon',
      description: CustomDescription,
      story: iconStoryCustom,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      meaningfulIconWithoutAccessibleName: meaningfulIconWithoutAccessibleNameA11yExample,
      decorativeIconWithRedundantLabel: decorativeIconWithRedundantLabelA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-icon'],
} satisfies ComponentDocsMeta<'p-icon'>;
