'use client';

import type { Story } from '@/models/story';

export const buttonGroupStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-group',
      properties,
      children: [
        { tag: 'p-button', properties: { variant: 'primary' }, children: ['Some label'] },
        { tag: 'p-button', properties: { variant: 'secondary' }, children: ['Some label'] },
      ],
    },
  ],
};
