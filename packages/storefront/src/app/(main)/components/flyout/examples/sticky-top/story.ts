'use client';

import type { Story } from '@/models/story';

export const flyoutStoryStickyTop: Story<'p-flyout'> = {
  state: {
    properties: {
      open: false,
      aria: { 'aria-label': 'Some Heading' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button',
      properties: {
        type: 'button',
        aria: { 'aria-haspopup': 'dialog' },
      },
      events: {
        onClick: {
          target: 'p-flyout',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Flyout'],
    },
    {
      tag: 'p-flyout',
      properties,
      events: {
        onDismiss: {
          target: 'p-flyout',
          prop: 'open',
          value: false,
        },
      },
      children: [
        {
          tag: 'p-heading',
          properties: { slot: 'header', size: 'large', tag: 'h2' },
          children: ['Some Heading'],
        },
        {
          tag: 'div',
          properties: {
            className: 'grid grid-cols-[2fr_1fr] gap-static-md items-start',
          },
          children: [
            {
              tag: 'div',
              properties: {
                className: 'sticky top-[calc(var(--p-flyout-sticky-top,0)+16px)] p-static-md bg-surface',
              },
              children: ['Some sticky element within content relying on --p-flyout-sticky-top'],
            },
            {
              tag: 'div',
              children: [
                { tag: 'p-text', children: ['Some Content Begin'] },
                { tag: 'div', properties: { className: 'w-[10px] h-[120vh] bg-[deeppink]' } },
                { tag: 'p-text', children: ['Some Content End'] },
              ],
            },
          ],
        },
      ],
    },
  ],
};

