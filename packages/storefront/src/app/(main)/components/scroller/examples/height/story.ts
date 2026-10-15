'use client';

import type { ElementConfig, Story } from '@porsche-design-system/story-generator';

export const scrollerStoryHeight: Story<'p-scroller'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-scroller',
      properties: { ...properties, className: 'max-w-[600px] whitespace-nowrap' },
      children: [
        ...(new Array(5).fill(null).map(() => ({
          tag: 'p-tag-dismissible',
          properties: {
            className: 'me-static-md',
          },
          children: ['Some tag content'],
        })) as ElementConfig<'p-tag-dismissible'>[]),
      ],
    },
  ],
};

