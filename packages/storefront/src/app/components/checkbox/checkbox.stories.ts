'use client';

import type { Story, SlotStories } from '@/models/story';

export const checkboxSlotStories: SlotStories<'p-checkbox'> = {
  'label-after': {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-popover',
          properties: { slot: 'label-after' },
          children: ['Some Popover Content.'],
        },
      ],
    },
  },
};

export const checkboxStory: Story<'p-checkbox'> = {
  state: {
    properties: { label: 'Some label', name: 'some-name' },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-checkbox',
      properties,
      children: [...(slots?.['label-after']?.generator() ?? [])],
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
      name: 'some-name',
    } as any,
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'div',
      properties: { className: 'flex flex-col gap-static-sm' },
      children: [
        {
          tag: 'p-checkbox',
          properties,
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                {
                  tag: 'img',
                  properties: {
                    src: 'assets/911.png',
                    alt: '',
                    className: 'object-contain inline-block align-middle -mt-2 me-static-sm w-[70px]',
                  },
                },
                'Some slotted label with custom content and a "label-after" slot',
              ],
            },
            {
              tag: 'p-popover',
              properties: { slot: 'label-after' },
              children: [
                'Some label with a ',
                {
                  tag: 'a',
                  properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
                  children: ['link'],
                },
              ],
            },
          ],
        },
        {
          tag: 'p-checkbox',
          properties,
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: ['Some slotted label'],
            },
          ],
        },
        {
          tag: 'p-checkbox',
          properties: { ...properties, disabled: 'true' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                'Disabled slotted label, a nested ',
                {
                  tag: 'a',
                  properties: { href: 'https://www.porsche.com', className: 'underline', tabindex: '-1' },
                  children: ['link'],
                },
                ' and a label-after slot.',
              ],
            },
            {
              tag: 'p-popover',
              properties: { slot: 'label-after' },
              children: ['Some information about the disabled state.'],
            },
          ],
        },
        {
          tag: 'p-checkbox',
          properties: { ...properties, state: 'error' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                'Some slotted label with a nested ',
                {
                  tag: 'a',
                  properties: { href: 'https://www.porsche.com', className: 'underline' },
                  children: ['link'],
                },
              ],
            },
            {
              tag: 'span',
              properties: { slot: 'message' },
              children: [
                'Some slotted error message with a ',
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
          properties: {
            className:
              'inline-flex flex-col p-fluid-xs gap-static-xs prose-text-sm cursor-pointer hover:[--p-checkbox-border-color:var(--color-primary)]',
          },
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
