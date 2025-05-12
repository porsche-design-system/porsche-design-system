'use client';

import type { Story } from '@/models/story';

export const inputNumberStory: Story<'p-input-number'> = {
  state: {
    properties: { label: 'Some label', name: 'Some name' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-input-number',
      properties,
    },
  ],
};

export const inputNumberStoryControls: Story<'p-input-number'> = {
  generator: () => [
    {
      tag: 'p-input-number',
      properties: { label: 'Some label', name: 'Some name', controls: true },
    },
  ],
};

export const inputNumberStoryUnit: Story<'p-input-number'> = {
  generator: () => [
    {
      tag: 'p-input-number',
      properties: { label: 'Some label', name: 'Some name', unit: 'EUR', unitPosition: 'suffix' },
    },
  ],
};

export const inputNumberStorySlots: Story<'p-input-number'> = {
  generator: () => [
    {
      tag: 'p-input-number',
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
