'use client';

import type { SlotStories, Story } from '@/models/story';
import { flyoutSlotStories } from '@/app/components/flyout/flyout.stories';

export const topbarSlotStories: SlotStories<'p-topbar'> = {
  top: {
    basic: {
      generator: () => [
        {
          tag: 'p-text',
          properties: {
            slot: 'top',
            align: 'center',
            theme: 'dark',
          },
          children: ['Some text'],
        },
      ],
    },
  },
  bottom: {
    basic: {
      generator: ({ properties } = {}) => [
        {
          tag: 'p-text',
          properties: {
            slot: 'bottom',
            align: 'center',
            ...(properties?.gradient && { theme: 'dark' }),
          },
          children: ['Some text'],
        },
      ],
    },
  },
};

export const topbarStory: Story<'p-topbar'> = {
  state: {
    properties: { href: '#' },
    slots: {
      top: topbarSlotStories.top.basic,
      bottom: topbarSlotStories.bottom.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-topbar',
      properties,
      children: [
        ...(slots?.top?.generator() ?? []),
        {
          tag: 'p-button-pure',
          properties: {
            slot: 'start',
            type: 'button',
            icon: 'menu-lines',
            hideLabel: true,
            ...(properties?.gradient && { theme: 'dark' }),
          },
          children: ['Menu'],
        },
        {
          tag: 'p-button',
          properties: {
            slot: 'end',
            type: 'button',
            variant: 'secondary',
            compact: true,
            ...(properties?.gradient && { theme: 'dark' }),
          },
          children: ['Sign in'],
        },
        ...(slots?.bottom?.generator({ properties }) ?? []),
      ],
    },
  ],
};

/*
<p-topbar>
<p-text slot="top" align="center" theme="dark">Some text</p-text>
<p-text slot="bottom" align="center">Some text</p-text>
<p-button-pure slot="start" type="button" icon="menu-lines" hide-label="true">Menu</p-button-pure>
  <p-button slot="end" type="button" variant="secondary" compact="true">Sign in</p-button>
  </p-topbar>
*/
