'use client';

import type { Story } from '@/models/story';

export const checkboxStory: Story<'p-checkbox'> = {
  state: {
    properties: { label: 'Some label', name: 'some-name' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-checkbox',
      properties,
    },
  ],
};

export const checkboxStoryIndeterminate: Story<'p-checkbox'> = {
  generator: () => [
    {
      tag: 'p-checkbox',
      properties: { label: 'Some label', indeterminate: true },
    },
    {
      tag: 'p-checkbox',
      properties: { label: 'Some label', indeterminate: true, checked: true },
    },
  ],
};

export const checkboxStorySlots: Story<'p-checkbox'> = {
  state: {
    properties: {
      state: 'error',
      name: 'some-name',
      'aria-labelledby': 'some-label-id',
      'aria-describedby': 'some-message-id',
    } as any,
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-checkbox',
      properties,
      children: [
        {
          tag: 'span',
          properties: { slot: 'label', id: 'some-label-id' },
          children: [
            'Some label with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'message', id: 'some-message-id' },
          children: [
            'Some error message with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
          ],
        },
      ],
    },
  ],
};
