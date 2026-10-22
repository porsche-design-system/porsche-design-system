import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/fieldset/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/fieldset/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/fieldset/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/fieldset/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const fieldsetMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/fieldset/default',
  examples: [
    'components/fieldset/slotted-label',
    'components/fieldset/slotted-message',
    'components/fieldset/required',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/fieldset/accessibility/unlabeled-field-group',
      'components/fieldset/accessibility/error-state-without-recovery-guidance',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-fieldset'],
} satisfies ComponentDocsMeta<'p-fieldset'>;
