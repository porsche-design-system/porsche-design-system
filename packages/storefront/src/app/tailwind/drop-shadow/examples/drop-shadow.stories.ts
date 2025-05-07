'use client';

import type { Story } from '@/models/story';

export const dropShadowStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'flex flex-col gap-fluid-md',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'shadow-(--drop-shadow-low) rounded-lg text-sm text-primary bg-background-surface p-fluid-md',
          },
          children: ['.shadow-(--drop-shadow-low)'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-(--drop-shadow-medium) rounded-lg text-sm text-primary bg-background-surface p-fluid-md',
          },
          children: ['.shadow-(--drop-shadow-medium)'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-(--drop-shadow-high) rounded-lg text-sm text-primary bg-background-surface p-fluid-md',
          },
          children: ['.shadow-(--drop-shadow-high)'],
        },
      ],
    },
  ],
};
