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

export const linkSocialStoryFrameworkRouting: Story<'p-link-social'> = {
  generator: () => [
    {
      tag: 'p-link-social',
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

export const linkSocialStoryIcon: Story<'p-link-pure'> = {
  generator: () => [
    {
      tag: 'p-link-social',
      properties: { href: 'https://porsche.com', icon: 'logo-tumblr' },
      children: ['Some label'],
    },
    {
      tag: 'p-link-social',
      properties: { href: 'https://porsche.com', iconSource: 'assets/icon-custom-kaixin.svg', hideLabel: true },
      children: ['Some label'],
    },
  ],
};
