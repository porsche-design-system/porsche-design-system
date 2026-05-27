'use client';

import type { Story } from '@/models/story';

export const iconStorySize: Story<'p-icon'> = {
  state: {
    properties: {
      className: 'me-static-sm',
      size: 'inherit',
      name: 'highway',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties: { className: 'text-[48px]', size: 'inherit' },
      children: [
        {
          tag: 'p-icon',
          properties,
        },
        'Some text',
      ],
    },
  ],
};

export const iconStorySizeCSSVar: Story<'p-icon'> = {
  state: {
    properties: {
      className: '[--p-icon-size:48px]',
      name: 'highway',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};

export const iconStoryResponsiveSize: Story<'p-icon'> = {
  state: {
    properties: {
      size: { base: 'sm', l: '2xl' },
      name: 'highway',
      aria: { 'aria-label': 'Highway icon' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-icon',
      properties,
    },
  ],
};

