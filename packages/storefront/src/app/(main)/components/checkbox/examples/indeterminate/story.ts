'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const checkboxStoryIndeterminate: Story<'p-checkbox'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'flex flex-col gap-static-sm' },
      children: [
        {
          tag: 'p-checkbox',
          properties: { label: 'Some label', indeterminate: true },
        },
        {
          tag: 'p-checkbox',
          properties: { label: 'Some label', indeterminate: true, checked: true },
        },
      ],
    },
  ],
};

