'use client';

import type { Story } from '@/models/story';

export const tabsStoryActiveTabIndex: Story<'p-tabs'> = {
  state: {
    properties: {
      activeTabIndex: 1,
      aria: {
        'aria-label': 'Some label for the tablist',
        'aria-description': 'Some description for the tablist',
      },
    },
  },
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
