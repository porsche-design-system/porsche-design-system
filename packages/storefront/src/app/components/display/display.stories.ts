'use client';

import type { Story } from '@/models/story';

export const displayStory: Story<'p-display'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-display',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};

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

export const displayStorySemantics: Story<'p-display'> = {
  generator: () => [
    {
      tag: 'p-display',
      properties: {
        tag: 'h3',
      },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
    {
      tag: 'p-display',
      children: [{ tag: 'h3', children: ['The quick brown fox jumps over the lazy dog'] }],
    },
  ],
};

export const displayStoryColorInherit: Story<'p-display'> = {
  state: {
    properties: {
      tag: 'h3',
      color: 'inherit',
      className: 'text-[deeppink]',
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
