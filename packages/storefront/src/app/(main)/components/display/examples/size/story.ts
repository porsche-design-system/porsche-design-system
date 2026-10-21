'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const displayStorySizeInherit: Story<'p-display'> = {
  state: {
    properties: {
      tag: 'h3',
      size: 'inherit',
      className: 'text-[5rem]',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-display',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};

export const displayStorySizeResponsive: Story<'p-display'> = {
  state: {
    properties: {
      tag: 'h3',
      size: { base: 'medium', l: 'large' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-display',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};

