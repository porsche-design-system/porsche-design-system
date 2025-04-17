'use client';

import type { Story } from '@/models/story';

export const textareaStory: Story<'p-textarea'> = {
  state: {
    properties: { name: 'some-name', label: 'Some label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-textarea',
      properties,
    },
  ],
};

export const textareaStorySlots: Story<'p-textarea'> = {
  state: {
    properties: { name: 'some-name', state: 'error' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-textarea',
      properties,
      children: [
        {
          tag: 'span',
          properties: {
            slot: 'label',
          },
          children: [
            'Some label with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: {
            slot: 'description',
          },
          children: [
            'Some description with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: {
            slot: 'message',
          },
          children: [
            'Some error message with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
      ],
    },
  ],
};
