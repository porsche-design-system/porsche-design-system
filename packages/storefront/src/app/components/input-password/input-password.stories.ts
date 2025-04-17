'use client';

import type { Story } from '@/models/story';

export const inputPasswordStory: Story<'p-input-password'> = {
  state: {
    properties: { label: 'Some label', name: 'Some name', toggle: true },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-input-password',
      properties,
    },
  ],
};

export const inputPasswordStoryToggle: Story<'p-input-password'> = {
  generator: () => [
    {
      tag: 'p-input-password',
      properties: { label: 'Some label', name: 'Some name', toggle: true },
    },
  ],
};

export const inputPasswordStorySlots: Story<'p-input-password'> = {
  generator: () => [
    {
      tag: 'p-input-password',
      properties: { state: 'error' },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label', id: 'some-label-id' },
          children: [
            'Some label with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'description', id: 'some-description-id' },
          children: [
            'Some description with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'message', id: 'some-message-id' },
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
