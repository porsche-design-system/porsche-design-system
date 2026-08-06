import { componentMeta } from '@porsche-design-system/component-meta';
import { decorativeFlagWithRedundantLabelA11yExample } from '@/app/(main)/components/flag/accessibility/examples/decorative-flag-with-redundant-label/example';
import { informativeFlagWithoutAccessibleNameA11yExample } from '@/app/(main)/components/flag/accessibility/examples/informative-flag-without-accessible-name/example';
import AccessibilityOverview from '@/app/(main)/components/flag/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/flag/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/flag/configurator/introduction.mdx';
import { flagStory } from '@/app/(main)/components/flag/configurator/story';
import ResponsiveSizeDescription from '@/app/(main)/components/flag/examples/responsive-size/example.mdx';
import { flagStoryResponsiveSize } from '@/app/(main)/components/flag/examples/responsive-size/story';
import SizeDescription from '@/app/(main)/components/flag/examples/size/example.mdx';
import { flagStorySize } from '@/app/(main)/components/flag/examples/size/story';
import SizeCssVarDescription from '@/app/(main)/components/flag/examples/size-css-var/example.mdx';
import { flagStorySizeCSSVar } from '@/app/(main)/components/flag/examples/size-css-var/story';
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
