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

export const popoverControlledAiTagGenerated: Story<'p-popover'> = {
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
              children: ['Information'],
            },
            {
              tag: 'p-text',
              properties: {
                size: 'x-small',
                color: 'contrast-high',
              },
              children: ['This [content] was generated with artificial intelligence.'],
            },
          ],
        },
      ],
    },
  ],
};

export const popoverControlledAiTagModified: Story<'p-popover'> = {
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
              children: ['Information'],
            },
            {
              tag: 'p-text',
              properties: {
                size: 'x-small',
                color: 'contrast-high',
              },
              children: ['This [content] has been modified with artificial intelligence.'],
            },
          ],
        },
      ],
    },
  ],
};
