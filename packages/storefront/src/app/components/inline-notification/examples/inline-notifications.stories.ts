'use client';

import type { Story } from '@/components/playground/componentStory';

export const inlineNotificationStory: Story = {
  state: { properties: { heading: 'Some heading', headingTag: 'h3', description: 'Some description.' } },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-inline-notification',
      properties,
    },
  ],
};
