import { componentMeta } from '@porsche-design-system/component-meta';
import { spinnerMountedOnlyWhenLoadingStartsA11yExample } from '@/app/(main)/components/spinner/accessibility/examples/spinner-mounted-only-when-loading-starts/example';
import { spinnerWithoutLoadingMessageA11yExample } from '@/app/(main)/components/spinner/accessibility/examples/spinner-without-loading-message/example';
import AccessibilityOverview from '@/app/(main)/components/spinner/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/spinner/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/spinner/configurator/introduction.mdx';
import { spinnerStory } from '@/app/(main)/components/spinner/configurator/story';
import ColorDescription from '@/app/(main)/components/spinner/examples/color/example.mdx';
import { spinnerStoryColor } from '@/app/(main)/components/spinner/examples/color/story';
import ColorCssVarDescription from '@/app/(main)/components/spinner/examples/color-css-var/example.mdx';
import { spinnerStoryColorCSSVar } from '@/app/(main)/components/spinner/examples/color-css-var/story';
import ResponsiveSizeDescription from '@/app/(main)/components/spinner/examples/responsive-size/example.mdx';
import { spinnerStoryResponsiveSize } from '@/app/(main)/components/spinner/examples/responsive-size/story';
import SizeDescription from '@/app/(main)/components/spinner/examples/size/example.mdx';
import { spinnerStorySize } from '@/app/(main)/components/spinner/examples/size/story';
import SizeCssVarDescription from '@/app/(main)/components/spinner/examples/size-css-var/example.mdx';
import { spinnerStorySizeCSSVar } from '@/app/(main)/components/spinner/examples/size-css-var/story';
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
