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
          properties: { slot: 'label', id: 'some-label-id' },
          children: [
            'Some label with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            ' and a "label-after" slot.',
          ],
        },
        {
          tag: 'p-popover',
          properties: { slot: 'label-after', className: 'ms-static-xs' },
          children: [
            'Some Popover content with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'description', id: 'some-description-id' },
          children: [
            'Some description with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'message', id: 'some-message-id' },
          children: [
            'Some error message with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
      ],
    },
  ],
};
