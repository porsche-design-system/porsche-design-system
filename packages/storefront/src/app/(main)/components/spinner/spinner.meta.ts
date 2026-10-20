import { componentMeta } from '@porsche-design-system/component-meta';
import { spinnerMountedOnlyWhenLoadingStartsA11yExample } from '@porsche-design-system/examples-accessibility/components/spinner/accessibility/spinner-mounted-only-when-loading-starts/example';
import { spinnerWithoutLoadingMessageA11yExample } from '@porsche-design-system/examples-accessibility/components/spinner/accessibility/spinner-without-loading-message/example';
import ColorDescription from '@porsche-design-system/examples-stories/components/spinner/color/example.mdx';
import { spinnerStoryColor } from '@porsche-design-system/examples-stories/components/spinner/color/story';
import ColorCssVarDescription from '@porsche-design-system/examples-stories/components/spinner/color-css-var/example.mdx';
import { spinnerStoryColorCSSVar } from '@porsche-design-system/examples-stories/components/spinner/color-css-var/story';
import { spinnerStory } from '@porsche-design-system/examples-stories/components/spinner/default/story';
import ResponsiveSizeDescription from '@porsche-design-system/examples-stories/components/spinner/responsive-size/example.mdx';
import { spinnerStoryResponsiveSize } from '@porsche-design-system/examples-stories/components/spinner/responsive-size/story';
import SizeDescription from '@porsche-design-system/examples-stories/components/spinner/size/example.mdx';
import { spinnerStorySize } from '@porsche-design-system/examples-stories/components/spinner/size/story';
import SizeCssVarDescription from '@porsche-design-system/examples-stories/components/spinner/size-css-var/example.mdx';
import { spinnerStorySizeCSSVar } from '@porsche-design-system/examples-stories/components/spinner/size-css-var/story';
import AccessibilityOverview from '@/app/(main)/components/spinner/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/spinner/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/spinner/configurator/introduction.mdx';
import NotesDisableAnimationDescription from '@/app/(main)/components/spinner/notes/disable-animation/note.mdx';
import Usage from '@/app/(main)/components/spinner/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const spinnerMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: spinnerStory,
  },
  examples: {
    size: {
      kind: 'story',
      name: 'Size via Prop',
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
      name: 'Color via Prop',
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
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      spinnerMountedOnlyWhenLoadingStarts: spinnerMountedOnlyWhenLoadingStartsA11yExample,
      spinnerWithoutLoadingMessage: spinnerWithoutLoadingMessageA11yExample,
    },
    tests: AccessibilityTests,
  },
  notes: {
    disableAnimation: {
      name: 'Disable animation',
      description: NotesDisableAnimationDescription,
    },
  },
  api: componentMeta['p-spinner'],
} satisfies ComponentDocsMeta<'p-spinner'>;
