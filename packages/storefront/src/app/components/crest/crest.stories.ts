'use client';

import type { Story } from '@/models/story';

export const crestStory: Story<'p-crest'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-crest',
      properties,
    },
  ],
};

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
