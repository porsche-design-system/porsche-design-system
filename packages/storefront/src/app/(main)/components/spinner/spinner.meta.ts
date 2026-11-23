import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/spinner/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/spinner/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/spinner/configurator/introduction.mdx';
import NotesDisableAnimationDescription from '@/app/(main)/components/spinner/notes/disable-animation/note.mdx';
import Usage from '@/app/(main)/components/spinner/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const spinnerMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/spinner/default',
  examples: [
    'components/spinner/size',
    'components/spinner/size-css-var',
    'components/spinner/responsive-size',
    'components/spinner/color',
    'components/spinner/color-css-var',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/spinner/accessibility/spinner-mounted-only-when-loading-starts',
      'components/spinner/accessibility/spinner-without-loading-message',
    ],
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
