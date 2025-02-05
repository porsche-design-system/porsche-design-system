'use client';

import type { Story } from '@/components/playground/componentStory';

export const modelSignatureStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-model-signature',
      properties,
    },
  ],
};
