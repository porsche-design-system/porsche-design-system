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
          tag: 'div',
          properties: { slot: 'label-start', className: 'w-[22px] h-[22px] bg-[deeppink] mr-static-sm rounded-full' },
        },
        {
          tag: 'span',
          properties: { slot: 'label' },
          children: [
            'Some slotted label with a "label-start" and "label-end" slot',
          ],
        },
        {
          tag: 'p-popover',
          properties: { slot: 'label-end', className: 'ml-static-xs' },
          children: [
            'Some label with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'message' },
          children: [
            'Some error message with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
          ],
        },
      ],
    },
  ],
};

export const checkboxStoryWrappedLabel: Story<'p-checkbox'> = {
  state: {
    properties: {
      checked: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'div',
      properties: {
        className:
          'flex items-start w-64 border-2 border-contrast-lower rounded-md hover:border-primary transition-colors',
      },
      children: [
        {
          tag: 'label',
          properties: { className: 'inline-flex flex-col p-fluid-xs gap-static-xs prose-text-sm cursor-pointer hover:[--p-checkbox-border-color:var(--color-primary)]' },
          children: [
            {
              tag: 'span',
              children: ['Some wrapped custom label besides a popover'],
            },
            {
              tag: 'p-checkbox',
              properties,
            },
          ],
          events: {
            onClick: {
              target: 'p-checkbox',
              prop: 'checked',
              value: true,
              preventDefault: true,
            },
          },
        },
        {
          tag: 'p-popover',
          properties: { className: 'mr-static-xs mt-static-xs' },
          children: ['Some additional content.'],
        },
      ],
    },
  ],
};
