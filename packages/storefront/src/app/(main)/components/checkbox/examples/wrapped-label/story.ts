'use client';

import type { Story } from '@/models/story';

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

