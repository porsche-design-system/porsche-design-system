'use client';

import type { Story } from '@/models/story';

export const textStory: Story<'p-text'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties,
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};

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
      size: { base: 'small', l: 'medium' },
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

export const textStorySemantics: Story<'p-text'> = {
  generator: () => [
    {
      tag: 'p-text',
      properties: { tag: 'blockquote' },
      children: ['The quick brown fox jumps over the lazy dog'],
    },
    {
      tag: 'p-text',
      children: [{ tag: 'blockquote', children: ['The quick brown fox jumps over the lazy dog'] }],
    },
  ],
};
