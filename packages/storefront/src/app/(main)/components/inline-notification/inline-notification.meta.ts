import { componentMeta } from '@porsche-design-system/component-meta';
import {
  inlineNotificationExampleActionButton,
  inlineNotificationExampleEvents,
} from '@porsche-design-system/shared/examples';
import { notificationMountedOnlyWhenNeededA11yExample } from '@/app/(main)/components/inline-notification/accessibility/examples/notification-mounted-only-when-needed/example';
import { warningWithoutDescriptiveHeadingA11yExample } from '@/app/(main)/components/inline-notification/accessibility/examples/warning-without-descriptive-heading/example';
import AccessibilityOverview from '@/app/(main)/components/inline-notification/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/inline-notification/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/inline-notification/configurator/introduction.mdx';
import { inlineNotificationStory } from '@/app/(main)/components/inline-notification/configurator/story';
import ActionButtonDescription from '@/app/(main)/components/inline-notification/examples/action-button/example.mdx';
import EventHandlingDescription from '@/app/(main)/components/inline-notification/examples/event-handling/example.mdx';
import Usage from '@/app/(main)/components/inline-notification/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const inlineNotificationMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: inlineNotificationStory,
  },
  examples: {
    eventHandling: {
      kind: 'example',
      name: 'Event Handling',
      description: EventHandlingDescription,
      example: inlineNotificationExampleEvents,
    },
    actionButton: {
      kind: 'example',
      name: 'Action Button',
      description: ActionButtonDescription,
      example: inlineNotificationExampleActionButton,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      notificationMountedOnlyWhenNeeded: notificationMountedOnlyWhenNeededA11yExample,
      warningWithoutDescriptiveHeading: warningWithoutDescriptiveHeadingA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-inline-notification'],
} satisfies ComponentDocsMeta<'p-inline-notification'>;
