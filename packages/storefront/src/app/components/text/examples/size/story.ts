'use client';

import type { Story } from '@/models/story';

export const textStorySize: Story<'p-text'> = {
  state: {
    properties: {
      className: 'text-[3rem]',
      size: 'inherit',
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

