'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const tagStoryMultiline: Story<'p-tag'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'w-[100px]',
      },
      children: [
        {
          tag: 'p-tag',
          properties: { variant: 'success', className: 'whitespace-normal' },
          children: ['Some label with longer text wrapped in a narrow container'],
        },
      ],
    },
  ],
};

