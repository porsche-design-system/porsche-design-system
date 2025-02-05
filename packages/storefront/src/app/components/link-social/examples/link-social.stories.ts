'use client';

import type { Story } from '@/components/playground/componentStory';

export const linkSocialStory: Story = {
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
