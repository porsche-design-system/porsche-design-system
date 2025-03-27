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

export const textareaWrapperStoryCounter: Story<'p-textarea-wrapper'> = {
  generator: () => [
    {
      tag: 'p-textarea-wrapper',
      properties: { label: 'Some label' },
      children: [{ tag: 'textarea', properties: { name: 'some-name', maxLength: 200 } }],
    },
    {
      tag: 'p-textarea-wrapper',
      properties: { label: 'Some label', showCounter: false },
      children: [{ tag: 'textarea', properties: { name: 'some-name', maxLength: 200 } }],
    },
  ],
};

export const textareaWrapperStorySlots: Story<'p-textarea-wrapper'> = {
  state: {
    properties: { state: 'error' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-textarea-wrapper',
      properties,
      children: [
        {
          tag: 'span',
          properties: { slot: 'label' },
          children: [
            'Some label with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'description' },
          children: [
            'Some description with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'textarea',
          properties: {
            name: 'some-name',
            'aria-labelledby': 'some-label-id',
            'aria-describedby': 'some-description-id some-message-id',
          },
        },
        {
          tag: 'span',
          properties: { slot: 'message' },
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
