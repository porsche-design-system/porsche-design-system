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
      className: 'me-static-sm',
      size: 'inherit',
      aria: { 'aria-label': 'Loading page content' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties: {
        className: 'text-[48px]',
        size: 'inherit',
      },
      children: [
        {
          tag: 'p-spinner',
          properties,
        },
        'Some text',
      ],
    },
  ],
};

export const spinnerStorySizeCSSVar: Story<'p-spinner'> = {
  state: {
    properties: {
      className: '[--p-spinner-size:48px]',
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

export const spinnerStoryColor: Story<'p-spinner'> = {
  state: {
    properties: {
      className: 'me-static-sm',
      color: 'inherit',
      aria: { 'aria-label': 'Loading page content' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text',
      properties: {
        className: 'text-[deeppink]',
        color: 'inherit',
      },
      children: [
        {
          tag: 'p-spinner',
          properties,
        },
        'Some text',
      ],
    },
  ],
};

export const spinnerStoryColorCSSVar: Story<'p-spinner'> = {
  state: {
    properties: {
      className: '[--p-spinner-color:deeppink] [--p-spinner-track-color:lightpink]',
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
      size: { base: 'small', l: 'xx-large' },
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
