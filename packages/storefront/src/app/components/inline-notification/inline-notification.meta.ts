import { componentMeta } from '@porsche-design-system/component-meta';
import {
  inlineNotificationExampleActionButton,
  inlineNotificationExampleEvents,
} from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/components/inline-notification/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/inline-notification/configurator/introduction.mdx';
import { inlineNotificationStory } from '@/app/components/inline-notification/configurator/story';
import ActionButtonDescription from '@/app/components/inline-notification/examples/action-button/example.mdx';
import EventHandlingDescription from '@/app/components/inline-notification/examples/event-handling/example.mdx';
import Usage from '@/app/components/inline-notification/usage/page.mdx';
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
  accessibility: Accessibility,
  api: componentMeta['p-inline-notification'],
} satisfies ComponentDocsMeta<'p-inline-notification'>;

