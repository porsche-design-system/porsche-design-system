'use client';

import type { Story } from '@/models/story';

export const buttonGroupStory: Story<'p-button-group'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-group',
      properties,
      children: [
        { tag: 'p-button', properties: { variant: 'primary' }, children: ['Some label'] },
        { tag: 'p-button', properties: { variant: 'secondary' }, children: ['Some label'] },
      ],
    },
  ],
};

export const buttonGroupStoryCustomBreakpoint: Story<'p-button-group'> = {
  state: {
    properties: {
      direction: { base: 'column', s: 'row' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-group',
      properties,
      children: [
        { tag: 'p-button', properties: { variant: 'primary' }, children: ['Some label'] },
        { tag: 'p-button', properties: { variant: 'secondary' }, children: ['Some label'] },
      ],
    },
  ],
};
