'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const modelSignatureStory: Story<'p-model-signature'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-model-signature',
      properties,
    },
  ],
};

