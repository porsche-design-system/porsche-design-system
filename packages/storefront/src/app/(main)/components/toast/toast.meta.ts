import { componentMeta } from '@porsche-design-system/component-meta';
import { toastExample } from '@porsche-design-system/shared/examples';
import AccessibilityOverview from '@/app/(main)/components/toast/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/toast/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/toast/configurator/introduction.mdx';
import { toastStory } from '@/app/(main)/components/toast/configurator/story';
import Usage from '@/app/(main)/components/toast/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const toastMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: toastStory,
    example: toastExample,
  },
  examples: {},
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {},
    tests: AccessibilityTests,
  },
  api: componentMeta['p-toast'],
} satisfies ComponentDocsMeta<'p-toast'>;
