'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const textStorySizeResponsive: Story<'p-text'> = {
  state: {
    properties: {
      size: { base: 'sm', l: '2xl' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};
