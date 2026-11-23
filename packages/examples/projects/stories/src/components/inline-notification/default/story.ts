'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const inlineNotificationStory: Story<'p-inline-notification'> = {
  state: { properties: { heading: 'Some heading', headingTag: 'h2', description: 'Some description.' } },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-inline-notification',
      properties,
    },
  ],
};
