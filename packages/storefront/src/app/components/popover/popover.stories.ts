'use client';

import type { Story } from '@/models/story';

export const popoverStory: Story<'p-popover'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: ['Some additional content.'],
    },
  ],
};

export const popoverControlled: Story<'p-popover'> = {
  state: {
    properties: {
      open: false,
    } as any,
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      events: {
        // @ts-ignore
        onDismiss: {
          target: 'p-popover',
          prop: 'open',
          value: false,
        },
      },
      children: [
        {
          tag: 'p-button-pure',
          properties: { hideLabel: true, aria: { 'aria-expanded': false }, icon: 'information', slot: 'button' },
          children: ['More information'],
          events: {
            onClick: {
              target: 'p-popover',
              prop: 'open',
              value: true,
            },
          },
        },
        'Some additional content.',
      ],
    },
  ],
};
