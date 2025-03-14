'use client';

import type { Story } from '@/models/story';

export const tabsStory: Story<'p-tabs'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tabs',
      properties,
      children: [
        {
          tag: 'p-tabs-item',
          properties: { label: 'Tab One' },
          children: [{ tag: 'p-text', children: ['Tab Content One'] }],
        },
        {
          tag: 'p-tabs-item',
          properties: { label: 'Tab Two' },
          children: [{ tag: 'p-text', children: ['Tab Content Two'] }],
        },
        {
          tag: 'p-tabs-item',
          properties: { label: 'Tab Three' },
          children: [{ tag: 'p-text', children: ['Tab Content Three'] }],
        },
      ],
    },
  ],
};
