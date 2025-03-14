'use client';

import type { Story } from '@/models/story';

export const linkSocialStory: Story<'p-link-social'> = {
  state: {
    properties: { href: 'https://example.com', icon: 'logo-facebook', target: '_blank', rel: 'nofollow noopener' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-link-social',
      properties,
      children: ['Facebook'],
    },
  ],
};
