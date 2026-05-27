'use client';

import type { Story } from '@/models/story';

export const flyoutStoryCustomStyling: Story<'p-flyout'> = {
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
      properties: {
        ...properties,
        footerBehavior: 'fixed',
        className: '[--p-flyout-width:90vw]',
      },
      events: {
        onDismiss: {
          target: 'p-flyout',
          prop: 'open',
          value: false,
        },
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: '-mt-(--ref-p-flyout-pt) -mx-(--ref-p-flyout-px) h-[300px]',
          },
          children: [
            {
              tag: 'img',
              properties: {
                className: 'w-full h-full object-cover',
                src: 'assets/lights.jpg',
                alt: 'Some image description',
              },
            },
          ],
        },
        {
          tag: 'p-display',
          properties: {
            className: 'mt-fluid-md',
            size: 'small',
            tag: 'h2',
          },
          children: ['Some heading'],
        },
        {
          tag: 'p-text',
          properties: {
            className: 'mt-fluid-sm',
          },
          children: ['Some paragraph.'],
        },
        {
          tag: 'div',
          properties: {
            slot: 'footer',
            className: 'grid grid-cols-[auto_1fr_auto] gap-static-sm justify-items-center',
          },
          children: [
            {
              tag: 'p-button-pure',
              properties: { icon: 'arrow-left', type: 'button', hideLabel: true },
              children: ['Prev'],
            },
            {
              tag: 'p-text',
              children: ['1/4'],
            },
            {
              tag: 'p-button-pure',
              properties: { icon: 'arrow-right', type: 'button', hideLabel: true },
              children: ['Next'],
            },
          ],
        },
      ],
    },
  ],
};

