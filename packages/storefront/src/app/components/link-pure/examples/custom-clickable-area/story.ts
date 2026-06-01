'use client';

import type { Story } from '@/models/story';

export const linkPureCustomPadding: Story<'p-link-pure'> = {
  generator: () => [
    {
      tag: 'p-link-pure',
      properties: { href: 'https://porsche.com', className: 'p-static-md' },
      children: ['Some label'],
    },
  ],
};

