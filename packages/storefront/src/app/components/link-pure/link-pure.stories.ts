'use client';

import type { Story } from '@/models/story';

export const linkPureStory: Story<'p-link-pure'> = {
  state: {
    properties: { href: 'https://porsche.com' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-link-pure',
      properties,
      children: ['Some label'],
    },
  ],
};

export const linkPureStoryFrameworkRouting: Story<'p-link-pure'> = {
  generator: () => [
    {
      tag: 'p-link-pure',
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

export const linkPureStoryIcon: Story<'p-link-pure'> = {
  generator: () => [
    {
      tag: 'p-link-pure',
      properties: { href: 'https://porsche.com', icon: 'phone' },
      children: ['Some label'],
    },
    {
      tag: 'p-link-pure',
      properties: { href: 'https://porsche.com', iconSource: 'assets/icon-custom-kaixin.svg', hideLabel: true },
      children: ['Some label'],
    },
  ],
};

export const linkPureCustomPadding: Story<'p-link-pure'> = {
  generator: () => [
    {
      tag: 'p-link-pure',
      properties: { href: 'https://porsche.com', className: 'p-static-md' },
      children: ['Some label'],
    },
  ],
};
