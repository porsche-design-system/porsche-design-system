'use client';

import type { Story } from '@porsche-design-system/story-generator';

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
