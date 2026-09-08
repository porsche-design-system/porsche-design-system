'use client';

import type { Story } from '@/models/story';

export const bannerStoryCustomStyling: Story<'p-banner'> = {
  state: {
    properties: {
      open: false,
      className: '[--p-banner-top:8px] [--p-banner-bottom:8px] [--p-banner-inset-x:8px] [--p-banner-max-w:70ch]',
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
      children: [
        {
          tag: 'p-heading',
          properties: {
            slot: 'heading',
            size: 'sm',
            weight: 'semibold',
          },
          children: ['Some heading'],
        },
        {
          tag: 'p-text',
          properties: {
            slot: 'description',
          },
          children: [
            'Some description. You can also add inline ',
            {
              tag: 'p-link-pure',
              properties: { href: 'https://porsche.com', icon: 'none', underline: true },
              children: ['links'],
            },
            ' to route to another page.',
          ],
        },
      ],
    },
  ],
};

