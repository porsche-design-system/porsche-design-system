'use client';

import type { Story } from '@/models/story';

export const bannerStory: Story<'p-banner'> = {
  state: {
    properties: {
      open: false,
      heading: 'Some Heading',
      headingTag: 'h3',
      description: 'Some Description',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button',
      properties: {
        type: 'button',
      },
      events: {
        onClick: {
          target: 'p-banner',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Banner'],
    },
    {
      tag: 'p-banner',
      properties,
      events: {
        onDismiss: {
          target: 'p-banner',
          prop: 'open',
          value: false,
        },
      },
    },
  ],
};
