'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const buttonPureStory: Story<'p-button-pure'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-pure',
      properties,
      children: ['Some label'],
    },
  ],
};
