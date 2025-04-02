'use client';

import type { Story } from '@/models/story';

export const wordmarkStory: Story<'p-wordmark'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
    },
  ],
};

export const wordmarkStorySizeInherit: Story<'p-wordmark'> = {
  state: {
    properties: {
      size: 'inherit',
      style: {
        height: '20px',
      },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
    },
  ],
};

export const wordmarkStoryCustomPadding: Story<'p-wordmark'> = {
  state: {
    properties: {
      href: 'https://porsche.com',
      aria: {
        'aria-label': 'Porsche Homepage',
      },
      style: {
        padding: '1.5rem',
      },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
    },
  ],
};
