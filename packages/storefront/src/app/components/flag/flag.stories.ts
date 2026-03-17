'use client';

import { FLAGS_ISO_3166, type FlagName } from '@porsche-design-system/flags';
import type { Story } from '@/models/story';

export const flagStory: Story<'p-flag'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flag',
      properties: {
        ...properties,
        aria: { 'aria-label': `Flag of ${FLAGS_ISO_3166[(properties?.name as FlagName) || 'de']}` },
      },
    },
  ],
};

export const flagStorySize: Story<'p-flag'> = {
  state: {
    properties: {
      className: 'me-static-sm',
      size: 'inherit',
      name: 'de',
      aria: { 'aria-label': 'Flag of Germany' },
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
          tag: 'p-flag',
          properties,
        },
        'Some text',
      ],
    },
  ],
};

export const flagStorySizeCSSVar: Story<'p-flag'> = {
  state: {
    properties: {
      className: '[--p-flag-size:48px]',
      name: 'de',
      aria: { 'aria-label': 'Flag of Germany' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flag',
      properties,
    },
  ],
};

export const flagStoryResponsiveSize: Story<'p-flag'> = {
  state: {
    properties: {
      name: 'de',
      size: { base: 'small', l: 'xx-large' },
      aria: { 'aria-label': 'Flag of Germany' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flag',
      properties,
    },
  ],
};
