'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const canvasStory: Story<'p-canvas'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-canvas',
      properties,
    },
  ],
};

