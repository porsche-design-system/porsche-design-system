'use client';

import type { Story } from '@/models/story';

export const buttonStory: Story<'p-button'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button',
      properties: {
        ...properties,
        ...(properties?.hideLabel && !properties?.icon && { icon: 'arrow-right' }),
      },
      children: ['Some label'],
    },
  ],
};
