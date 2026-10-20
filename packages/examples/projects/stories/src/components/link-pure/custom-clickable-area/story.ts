'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const linkPureCustomPadding: Story<'p-link-pure'> = {
  generator: () => [
    {
      tag: 'p-link-pure',
      properties: { href: 'https://porsche.com', className: 'p-static-md' },
      children: ['Some label'],
    },
  ],
};
