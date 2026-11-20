'use client';

import type { Story } from '@porsche-design-system/story-generator';

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
