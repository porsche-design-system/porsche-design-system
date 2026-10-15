'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const crestStoryCustomPadding: Story<'p-crest'> = {
  state: {
    properties: { href: 'https://porsche.com', className: 'p-static-md', aria: { 'aria-label': 'Porsche Homepage' } },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-crest',
      properties,
    },
  ],
};

