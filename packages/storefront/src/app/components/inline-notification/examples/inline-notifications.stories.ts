'use client';

import type { Story } from '@/models/story';

export const inlineNotificationStory: Story<'p-inline-notification'> = {
  state: { properties: { heading: 'Some heading', headingTag: 'h3', description: 'Some description.' } },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-inline-notification',
      properties,
    },
  ],
};
