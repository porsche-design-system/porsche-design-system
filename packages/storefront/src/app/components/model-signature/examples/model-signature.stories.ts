'use client';

import type { Story } from '@/models/story';

export const modelSignatureStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-model-signature',
      properties,
    },
  ],
};
