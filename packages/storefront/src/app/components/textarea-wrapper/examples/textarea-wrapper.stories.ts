'use client';

import type { Story } from '@/models/story';

export const textareaWrapperStory: Story<'p-textarea-wrapper'> = {
  state: {
    properties: { label: 'Some label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-textarea-wrapper',
      properties,
      children: [{ tag: 'textarea', properties: { name: 'some-name' } }],
    },
  ],
};
