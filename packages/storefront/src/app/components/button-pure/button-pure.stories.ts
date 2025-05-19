'use client';

import type { Story } from '@/models/story';
import type { CSSProperties } from 'react';

export const buttonPureStory: Story<'p-button-pure'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-pure',
      properties,
      children: ['Some label'],
    },
  ],
};

export const buttonPureStoryCustomPadding: Story<'p-button-pure'> = {
  state: {
    properties: {
      className: 'p-static-md',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-pure',
      properties,
      children: ['Some label'],
    },
  ],
};
