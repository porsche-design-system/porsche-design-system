import { componentMeta } from '@porsche-design-system/component-meta';
import { decorativeIconWithRedundantLabelA11yExample } from '@porsche-design-system/examples-stories/components/icon/accessibility/decorative-icon-with-redundant-label/example';
import { meaningfulIconWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/icon/accessibility/meaningful-icon-without-accessible-name/example';
import ColorDescription from '@porsche-design-system/examples-stories/components/icon/color/example.mdx';
import { iconStoryColor } from '@porsche-design-system/examples-stories/components/icon/color/story';
import ColorCssVarDescription from '@porsche-design-system/examples-stories/components/icon/color-css-var/example.mdx';
import { iconStoryColorCSSVar } from '@porsche-design-system/examples-stories/components/icon/color-css-var/story';
import CustomDescription from '@porsche-design-system/examples-stories/components/icon/custom/example.mdx';
import { iconStoryCustom } from '@porsche-design-system/examples-stories/components/icon/custom/story';
import { iconStory } from '@porsche-design-system/examples-stories/components/icon/default/story';
import OverviewDescription from '@porsche-design-system/examples-stories/components/icon/overview/example.mdx';
import { iconStoryOverview } from '@porsche-design-system/examples-stories/components/icon/overview/story';
import ResponsiveSizeDescription from '@porsche-design-system/examples-stories/components/icon/responsive-size/example.mdx';
import { iconStoryResponsiveSize } from '@porsche-design-system/examples-stories/components/icon/responsive-size/story';
import SizeDescription from '@porsche-design-system/examples-stories/components/icon/size/example.mdx';
import { iconStorySize } from '@porsche-design-system/examples-stories/components/icon/size/story';
import SizeCssVarDescription from '@porsche-design-system/examples-stories/components/icon/size-css-var/example.mdx';
import { iconStorySizeCSSVar } from '@porsche-design-system/examples-stories/components/icon/size-css-var/story';
import AccessibilityOverview from '@/app/(main)/components/icon/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/icon/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/icon/configurator/introduction.mdx';
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
