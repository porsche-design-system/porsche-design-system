'use client';

import type { CSSProperties } from 'react';
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

export const textStoryHyphenation: Story<'p-text'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'w-25 flex flex-col gap-fluid-sm' },
      children: [
        {
          tag: 'p-text',
          children: ['An extraordinarily Porsche'],
        },
        {
          tag: 'p-text',
          properties: { style: { '--p-hyphens': 'manual' } as CSSProperties },
          children: ['An extra\u00ADordinarily Porsche'],
        },
        {
          tag: 'p-text',
          properties: { style: { '--p-hyphens': 'none' } as CSSProperties },
          children: ['An extraordinarily Porsche'],
        },
      ],
    },
  ],
};
