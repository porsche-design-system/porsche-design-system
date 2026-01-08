'use client';

import type { CSSProperties } from 'react';
import type { Story } from '@/models/story';

export const bannerStory: Story<'p-banner'> = {
  state: {
    properties: {
      open: false,
      heading: 'Some Heading',
      headingTag: 'h3',
      description: 'Some Description',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button',
      properties: {
        type: 'button',
      },
      events: {
        onClick: {
          target: 'p-banner',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Banner'],
    },
    {
      tag: 'p-banner',
      properties,
      events: {
        onDismiss: {
          target: 'p-banner',
          prop: 'open',
          value: false,
        },
      },
    },
  ],
};

export const bannerStoryCustomStyling: Story<'p-banner'> = {
  state: {
    properties: {
      open: false,
      className: '[--p-banner-position-top:200px]',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button',
      properties: {
        type: 'button',
      },
      events: {
        onClick: {
          target: 'p-banner',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Banner'],
    },
    {
      tag: 'p-banner',
      properties,
      events: {
        onDismiss: {
          target: 'p-banner',
          prop: 'open',
          value: false,
        },
      },
      children: [
        {
          tag: 'h3',
          properties: {
            slot: 'heading',
          },
          children: [
            'Some heading with a ',
            { tag: 'p-link-pure', properties: { href: 'https://porsche.com', icon: 'none' }, children: ['link'] },
          ],
        },
        {
          tag: 'span',
          properties: {
            slot: 'description',
          },
          children: [
            'Some description. You can also add inline ',
            { tag: 'p-link-pure', properties: { href: 'https://porsche.com', icon: 'none' }, children: ['links'] },
            ' to route to another page.',
          ],
        },
      ],
    },
  ],
};
