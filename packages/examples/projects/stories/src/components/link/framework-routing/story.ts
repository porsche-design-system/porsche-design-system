'use client';

import type { Story } from '@porsche-design-system/story-generator';

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
