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
    } as any,
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-checkbox',
      properties,
      children: [
        {
          tag: 'span',
          properties: { slot: 'label' },
          children: [
            'Some label with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'message' },
          children: [
            'Some error message with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
          ],
        },
      ],
    },
  ],
};

export const checkboxStoryWrappedLabel: Story<'p-checkbox'> = {
  state: {
    properties: {
      state: 'error',
      name: 'some-name',
    } as any,
  },
  generator: () => [
    {
      tag: 'label',
      properties: { className: 'inline-flex flex-col gap-static-xs prose-text-sm cursor-pointer' },
      children: [
        'Some wrapped custom label',
        {
          tag: 'p-checkbox',
          properties: { className: 'cursor-default' },
        },
      ],
    },
    {
      tag: 'p-divider',
      properties: { className: 'my-static-lg' },
    },
    {
      tag: 'label',
      properties: { className: 'inline-flex flex-col gap-static-xs prose-text-sm cursor-pointer' },
      children: [
        {
          tag: 'span',
          children: [
            'Some wrapped custom label with a ',
            {
              tag: 'a',
              properties: { href: 'https://www.porsche.com', className: 'underline' },
              children: ['link'],
            },
            {
              tag: 'p-checkbox',
              properties: { className: 'cursor-default' },
            },
          ],
        },
      ],
    },
    {
      tag: 'p-divider',
      properties: { className: 'my-static-lg' },
    },
    {
      tag: 'div',
      properties: { className: 'flex gap-static-xs items-center' },
      children: [
        {
          tag: 'label',
          properties: { className: 'flex gap-static-sm items-center prose-text-sm cursor-pointer' },
          children: [
            {
              tag: 'p-checkbox',
            },
            {
              tag: 'span',
              children: ['Some wrapped custom label besides an popover'],
            },
          ],
        },
        {
          tag: 'p-popover',
          children: ['Some additional content.'],
        },
      ],
    },
  ],
};
