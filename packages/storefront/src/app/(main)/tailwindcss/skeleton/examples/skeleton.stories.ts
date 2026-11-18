'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const skeletonStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'grid gap-fluid-sm prose-text-sm' },
      children: [
        {
          tag: 'span',
          properties: { className: 'skeleton p-fluid-sm' },
          children: ['.skeleton'],
        },
        {
          tag: 'span',
          properties: { className: 'skeleton w-4/5 h-fluid-sm rounded-sm' },
        },
        {
          tag: 'span',
          properties: { className: 'skeleton w-4/5 h-fluid-sm rounded-sm' },
        },
        {
          tag: 'span',
          properties: { className: 'skeleton w-3/5 h-fluid-sm rounded-sm' },
        },
      ],
    },
  ],
};
