'use client';

import type { Story } from '@/models/story';

export const segmentedControlStory: Story<'p-segmented-control'> = {
  state: {
    properties: {
      label: 'Some Label',
      description: 'Some description',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-segmented-control',
      properties,
      children: [
        { tag: 'p-segmented-control-item', properties: { value: '1' }, children: ['Option 1'] },
        { tag: 'p-segmented-control-item', properties: { value: '2' }, children: ['Option 2'] },
        { tag: 'p-segmented-control-item', properties: { value: '3' }, children: ['Option 3'] },
        { tag: 'p-segmented-control-item', properties: { value: '4' }, children: ['Option 4'] },
        { tag: 'p-segmented-control-item', properties: { value: '5' }, children: ['Option 5'] },
      ],
    },
  ],
};

export const segmentedControlStoryLabel: Story<'p-segmented-control'> = {
  state: {
    properties: {
      value: '1',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-segmented-control',
      properties,
      children: [
        { tag: 'p-segmented-control-item', properties: { value: '1', label: 'Label' }, children: ['Option 1'] },
        { tag: 'p-segmented-control-item', properties: { value: '2', label: 'Label' }, children: ['Option 2'] },
        { tag: 'p-segmented-control-item', properties: { value: '3', label: 'Label' }, children: ['Option 3'] },
        {
          tag: 'p-segmented-control-item',
          properties: { value: '4', label: 'Label', disabled: true },
          children: ['Option 4'],
        },
        { tag: 'p-segmented-control-item', properties: { value: '5', label: 'Label' }, children: ['Option 5'] },
      ],
    },
  ],
};

export const segmentedControlStorySlots: Story<'p-segmented-control'> = {
  generator: () => [
    {
      tag: 'p-segmented-control',
      properties: { state: 'error' },
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
        { tag: 'p-segmented-control-item', properties: { value: '1' }, children: ['Option 1'] },
        { tag: 'p-segmented-control-item', properties: { value: '2' }, children: ['Option 2'] },
        { tag: 'p-segmented-control-item', properties: { value: '3' }, children: ['Option 3'] },
        { tag: 'p-segmented-control-item', properties: { value: '4' }, children: ['Option 4'] },
        { tag: 'p-segmented-control-item', properties: { value: '5' }, children: ['Option 5'] },
      ],
    },
  ],
};
