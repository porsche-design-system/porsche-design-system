'use client';

import type { Story } from '@/models/story';
import type { ElementConfig } from '@/utils/generator/generator';

export const tabsStoryGradient: Story<'p-tabs'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tabs',
      properties,
      children: [
        ...(new Array(20).fill(null).map((_, index) => ({
          tag: 'p-tabs-item',
          properties: { label: `Tab ${index + 1}` },
          children: [{ tag: 'p-text', children: [`Tab Content ${index + 1}`] }],
        })) as ElementConfig<'p-tabs-item'>[]),
      ],
    },
  ],
};

