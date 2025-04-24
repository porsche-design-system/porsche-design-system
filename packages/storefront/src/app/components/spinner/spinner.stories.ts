'use client';

import type { Story } from '@/models/story';

export const spinnerStory: Story<'p-spinner'> = {
  state: {
    properties: { aria: { 'aria-label': 'Loading page content' } },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-spinner',
      properties,
    },
  ],
};

export const spinnerStorySize: Story<'p-spinner'> = {
  state: {
    properties: {
      size: 'inherit',
      style: { width: '96px', height: '96px' },
      aria: { 'aria-label': 'Loading page content' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-spinner',
      properties,
    },
  ],
};

export const spinnerStoryResponsiveSize: Story<'p-spinner'> = {
  state: {
    properties: {
      size: { base: 'small', l: 'medium' },
      aria: { 'aria-label': 'Loading page content' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-spinner',
      properties,
    },
  ],
};
