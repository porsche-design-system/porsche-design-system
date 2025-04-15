'use client';

import type { Story } from '@/models/story';

export const checkboxWrapperStory: Story<'p-checkbox-wrapper'> = {
  state: {
    properties: { label: 'Some label' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-checkbox-wrapper',
      properties,
      children: [{ tag: 'input', properties: { type: 'checkbox', name: 'some-name' } }],
    },
  ],
};

export const checkboxWrapperStorySlots: Story<'p-checkbox-wrapper'> = {
  state: {
    properties: { state: 'error' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-checkbox-wrapper',
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
          tag: 'input',
          properties: {
            type: 'checkbox',
            name: 'some-name',
            'aria-labelledby': 'some-label-id',
            'aria-describedby': 'some-message-id',
          },
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
