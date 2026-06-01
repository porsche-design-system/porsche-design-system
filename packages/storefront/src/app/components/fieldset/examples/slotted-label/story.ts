'use client';

import type { Story } from '@/models/story';

export const fieldsetStorySlottedLabel: Story<'p-fieldset'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-fieldset',
      properties,
      children: [
        { tag: 'span', properties: { slot: 'label' }, children: ['Some legend label'] },
        {
          tag: 'p-input-text',
          properties: { label: 'Some label', name: 'some-name' },
        },
      ],
    },
  ],
};

