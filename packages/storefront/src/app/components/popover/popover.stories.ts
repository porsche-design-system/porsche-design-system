'use client';

import type { Story } from '@/models/story';

export const popoverStory: Story<'p-popover'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: ['Some additional content.'],
    },
  ],
};

export const popoverControlled: Story<'p-popover'> = {
  state: {
    properties: {
      open: false,
    } as any,
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      events: {
        // @ts-ignore
        onDismiss: {
          target: 'p-popover',
          prop: 'open',
          value: false,
        },
      },
      children: [
        {
          tag: 'p-button-pure',
          properties: { hideLabel: true, aria: { 'aria-expanded': false }, icon: 'information', slot: 'button' },
          children: ['More information'],
          events: {
            onClick: {
              target: 'p-popover',
              prop: 'open',
              value: true,
            },
          },
        },
        'Some additional content.',
      ],
    },
  ],
};

export const popoverControlledAiTag: Story<'p-popover'> = {
  state: {
    properties: {
      open: false,
    } as any,
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      events: {
        // @ts-ignore
        onDismiss: {
          target: 'p-popover',
          prop: 'open',
          value: false,
        },
      },
      children: [
        {
          tag: 'p-tag',
          properties: { color: 'background-frosted', icon: 'ai-spark-filled', slot: 'button' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button', 'aria-expanded': false },
              events: {
                onClick: {
                  target: 'p-popover',
                  prop: 'open',
                  value: true,
                },
              },
              children: ['AI-generated'],
            },
          ],
        },
        {
          tag: 'div',
          properties: { className: 'xs:max-w-[220px] flex flex-col gap-fluid-sm py-static-sm' },
          children: [
            {
              tag: 'p-heading',
              properties: { size: 'medium', tag: 'h3' },
              children: ['Content Credentials'],
            },
            {
              tag: 'p-text',
              properties: {
                size: 'xx-small',
                color: 'contrast-medium',
                className: '-mt-fluid-sm',
              },
              children: ['Created by Porsche AG, 5th April 2025'],
            },
            {
              tag: 'p-text',
              properties: {
                size: 'xx-small',
                color: 'contrast-high',
              },
              children: ['This image combines multiple elements. At least one of them was generated using an AI tool.'],
            },
            {
              tag: 'dl',
              properties: { className: 'prose-text-xs m-0' },
              children: [
                {
                  tag: 'dt',
                  properties: { className: 'm-0 text-contrast-medium' },
                  children: ['Created by'],
                },
                {
                  tag: 'dd',
                  properties: { className: 'm-0 text-primary' },
                  children: ['Porsche AG'],
                },
                {
                  tag: 'dt',
                  properties: { className: 'm-0 text-contrast-medium mt-fluid-sm' },
                  children: ['AI tools used'],
                },
                {
                  tag: 'dd',
                  properties: { className: 'm-0 text-primary' },
                  children: ['Adobe Firefly'],
                },
              ],
            },
            {
              tag: 'p-button',
              properties: {
                type: 'button',
                variant: 'ghost',
                compact: true,
                aria: { 'aria-label': 'Check content credentials' },
              },
              children: ['Check'],
            },
          ],
        },
      ],
    },
  ],
};
