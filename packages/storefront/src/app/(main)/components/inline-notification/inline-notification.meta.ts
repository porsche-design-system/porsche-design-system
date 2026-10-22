import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/inline-notification/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/inline-notification/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/inline-notification/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/inline-notification/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inlineNotificationMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/inline-notification/default',
  examples: ['components/inline-notification/event-handling', 'components/inline-notification/action-button'],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/inline-notification/accessibility/notification-mounted-only-when-needed',
      'components/inline-notification/accessibility/warning-without-descriptive-heading',
    ],
    tests: AccessibilityTests,
  },
  api: componentMeta['p-inline-notification'],
} satisfies ComponentDocsMeta<'p-inline-notification'>;
