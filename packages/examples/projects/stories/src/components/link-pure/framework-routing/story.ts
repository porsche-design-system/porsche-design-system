'use client';

import type { Story } from '@porsche-design-system/story-generator';

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
