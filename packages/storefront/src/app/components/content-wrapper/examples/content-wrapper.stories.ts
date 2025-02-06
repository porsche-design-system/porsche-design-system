'use client';

import type { Story } from '@/models/story';

export const contentWrapperStory: Story<'p-content-wrapper'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-content-wrapper',
      properties,
      children: [{ tag: 'div', properties: { className: 'example-content' }, children: ['Some content'] }],
    },
  ],
};
