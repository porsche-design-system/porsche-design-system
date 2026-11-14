'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const linkStoryCover: Story<'p-link'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className:
          'relative isolate flex flex-col items-start gap-static-md max-w-[400px] p-fluid-md rounded-3xl bg-surface [--p-link-cover-radius:var(--radius-3xl)]',
      },
      children: [
        { tag: 'p-heading', properties: { tag: 'h3', size: 'md' }, children: ['Porsche Approved'] },
        {
          tag: 'p-text',
          children: ['Pre-owned vehicles that meet the highest standards, with a warranty of up to 24 months.'],
        },
        {
          tag: 'p-link',
          properties: { href: 'https://porsche.com', variant: 'primary', cover: true },
          children: ['Discover more'],
        },
      ],
    },
  ],
};
