'use client';

import type { Story } from '@/models/story';

export const multiSelectStorySlots: Story<'p-multi-select'> = {
  generator: () => [
    {
      tag: 'p-multi-select',
      properties: { name: 'options', state: 'error' },
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
          properties: { slot: 'label-after' },
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
        { tag: 'p-multi-select-option', properties: { value: 'a' }, children: ['Option A'] },
        { tag: 'p-multi-select-option', properties: { value: 'b' }, children: ['Option B'] },
        { tag: 'p-multi-select-option', properties: { value: 'c' }, children: ['Option C'] },
      ],
    },
  ],
};

