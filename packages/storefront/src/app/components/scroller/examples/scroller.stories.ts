'use client';

import type { Story } from '@/components/playground/componentStory';

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
