'use client';

import type { Story } from '@/models/story';

export const flexStory: Story<'p-flex'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flex',
      properties: { ...properties },
      children: [
        {
          tag: 'p-flex-item',
          properties: { className: 'bg-sky-100 p-fluid-sm prose-text-sm text-center text-primary-light' },
          children: ['1'],
        },
        {
          tag: 'p-flex-item',
          properties: { className: 'bg-sky-200 p-fluid-sm prose-text-sm text-center text-primary-light' },
          children: ['2'],
        },
        {
          tag: 'p-flex-item',
          properties: { className: 'bg-sky-300 p-fluid-sm prose-text-sm text-center text-primary-light' },
          children: ['3'],
        },
      ],
    },
  ],
};
