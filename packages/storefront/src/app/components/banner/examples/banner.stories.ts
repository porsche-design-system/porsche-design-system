'use client';

import type { Story } from '@/models/story';

export const bannerStory: Story = {
  state: {
    properties: {
      heading: 'Some Heading',
      headingTag: 'h3',
      description: 'Some Description',
    },
  },
  generator: ({ properties } = {}, updateState = () => {}) => [
    {
      tag: 'p-button',
      properties: {
        type: 'button',
        onClick: () => updateState('p-banner', 'open', true),
      },
      children: ['Open Banner'],
    },
    {
      tag: 'p-banner',
      properties: { ...properties, onDismiss: () => updateState('p-banner', 'open', false) },
    },
  ],
};
