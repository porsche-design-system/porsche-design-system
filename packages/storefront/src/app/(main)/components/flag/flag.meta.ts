import { componentMeta } from '@porsche-design-system/component-meta';
import { decorativeFlagWithRedundantLabelA11yExample } from '@porsche-design-system/examples-stories/components/flag/accessibility/decorative-flag-with-redundant-label/example';
import { informativeFlagWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/flag/accessibility/informative-flag-without-accessible-name/example';
import { flagStory } from '@porsche-design-system/examples-stories/components/flag/default/story';
import ResponsiveSizeDescription from '@porsche-design-system/examples-stories/components/flag/responsive-size/example.mdx';
import { flagStoryResponsiveSize } from '@porsche-design-system/examples-stories/components/flag/responsive-size/story';
import SizeDescription from '@porsche-design-system/examples-stories/components/flag/size/example.mdx';
import { flagStorySize } from '@porsche-design-system/examples-stories/components/flag/size/story';
import SizeCssVarDescription from '@porsche-design-system/examples-stories/components/flag/size-css-var/example.mdx';
import { flagStorySizeCSSVar } from '@porsche-design-system/examples-stories/components/flag/size-css-var/story';
import AccessibilityOverview from '@/app/(main)/components/flag/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/flag/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/flag/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/flag/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const flagMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: flagStory,
  },
  examples: {
    size: {
      kind: 'story',
      name: 'Size via Prop',
      description: SizeDescription,
      story: flagStorySize,
    },
    sizeCssVar: {
      kind: 'story',
      name: 'Size via CSS Variable',
      description: SizeCssVarDescription,
      story: flagStorySizeCSSVar,
    },
    responsiveSize: {
      kind: 'story',
      name: 'Responsive Size',
      description: ResponsiveSizeDescription,
      story: flagStoryResponsiveSize,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      informativeFlagWithoutAccessibleName: informativeFlagWithoutAccessibleNameA11yExample,
      decorativeFlagWithRedundantLabel: decorativeFlagWithRedundantLabelA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-flag'],
} satisfies ComponentDocsMeta<'p-flag'>;
