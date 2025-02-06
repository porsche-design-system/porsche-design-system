'use client';

import type { Story } from '@/models/story';

export const modelSignatureStory: Story<'p-model-signature'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-model-signature',
      properties,
    },
  ],
};
