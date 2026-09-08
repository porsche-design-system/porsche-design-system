'use client';

import type { Story } from '@/models/story';

export const linkStoryFrameworkRouting: Story<'p-link'> = {
  generator: () => [
    {
      tag: 'p-link',
      children: [
        {
          tag: 'a',
          properties: { href: 'https://porsche.com' },
          children: ['Some label'],
        },
      ],
    },
  ],
};

