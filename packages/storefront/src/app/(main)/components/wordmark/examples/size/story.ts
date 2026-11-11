'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const wordmarkStorySizeInherit: Story<'p-wordmark'> = {
  state: {
    properties: {
      className: 'h-[20px]',
      size: 'inherit',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-wordmark',
      properties,
    },
  ],
};

