'use client';

import type { Story } from '@/models/story';

export const linkStoryIcon: Story<'p-link'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'flex gap-static-sm' },
      children: [
        {
          tag: 'p-link',
          properties: { href: 'https://porsche.com', icon: 'phone' },
          children: ['Some label'],
        },
        {
          tag: 'p-link',
          properties: { href: 'https://porsche.com', iconSource: 'assets/icon-custom-kaixin.svg', hideLabel: true },
          children: ['Some label'],
        },
      ],
    },
  ],
};

