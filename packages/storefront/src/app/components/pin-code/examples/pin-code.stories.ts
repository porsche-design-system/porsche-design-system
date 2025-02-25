'use client';

import type { Story } from '@/models/story';

export const pinCodeStory: Story<'p-pin-code'> = {
  state: {
    properties: { label: 'Some label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-pin-code',
      properties,
    },
  ],
};
