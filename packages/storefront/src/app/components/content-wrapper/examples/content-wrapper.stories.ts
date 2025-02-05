'use client';

import type { Story } from '@/components/playground/componentStory';

export const contentWrapperStory: Story = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-content-wrapper',
      properties,
      children: [{ tag: 'div', properties: { className: 'example-content' }, children: ['Some content'] }],
    },
  ],
};
