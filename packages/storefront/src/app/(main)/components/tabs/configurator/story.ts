'use client';

import type { Story } from '@/models/story';

const tabsAria = {
  'aria-label': 'Some label for the tablist',
  'aria-description': 'Some description for the tablist',
};

export const tabsStory: Story<'p-tabs'> = {
  state: {
    properties: {
      aria: tabsAria,
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
