'use client';

import type { Story } from '@/models/story';

export const selectWrapperStory: Story<'p-select-wrapper'> = {
  state: {
    properties: { label: 'Some label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-select-wrapper',
      properties,
      children: [
        {
          tag: 'select',
          properties: { name: 'some-name' },
          children: [
            { tag: 'option', properties: { value: 'a' }, children: ['Option A'] },
            { tag: 'option', properties: { value: 'b' }, children: ['Option B'] },
            { tag: 'option', properties: { value: 'c' }, children: ['Option C'] },
            { tag: 'option', properties: { value: 'd' }, children: ['Option D'] },
            { tag: 'option', properties: { value: 'e' }, children: ['Option E'] },
            { tag: 'option', properties: { value: 'f' }, children: ['Option F'] },
          ],
        },
      ],
    },
  ],
};
