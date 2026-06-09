'use client';

import type { Story } from '@/models/story';

export const linkPureStoryFrameworkRouting: Story<'p-link-pure'> = {
  generator: () => [
    {
      tag: 'p-link-pure',
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

