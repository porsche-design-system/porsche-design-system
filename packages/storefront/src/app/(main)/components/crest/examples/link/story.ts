'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const crestStoryLink: Story<'p-crest'> = {
  state: {
    properties: { href: 'https://porsche.com', aria: { 'aria-label': 'Porsche Homepage' } },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-crest',
      properties,
    },
  ],
};

