'use client';

import { visualizeGridConfig } from '@/app/components/grid/grid.stories';
import type { SlotStories, Story } from '@/models/story';

export const sheetSlotStories: SlotStories<'p-sheet'> = {
  header: {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-heading',
          properties: { slot: 'header', size: 'large', tag: 'h2' },
          children: ['Some Heading'],
        },
      ],
    },
  },
  default: {
    basic: {
      name: 'Basic',
      generator: () => [{ tag: 'p-text', children: ['Some Content'] }],
    },
    scrollable: {
      name: 'Scrollable Content',
      generator: () => [
        { tag: 'p-text', children: ['Some Content Begin'] },
        { tag: 'div', properties: { style: { width: '10px', height: '120vh', background: 'deeppink' } } },
        { tag: 'p-text', children: ['Some Content End'] },
      ],
    },
  },
};

export const sheetStory: Story<'p-sheet'> = {
  state: {
    properties: {
      open: false,
      aria: { 'aria-label': 'Some Heading' },
    },
    slots: {
      header: sheetSlotStories.header.basic,
      default: sheetSlotStories.default.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-button',
      properties: {
        type: 'button',
        aria: { 'aria-haspopup': 'dialog' },
      },
      events: {
        onClick: {
          target: 'p-sheet',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Sheet'],
    },
    {
      tag: 'p-sheet',
      properties,
      events: {
        onDismiss: {
          target: 'p-sheet',
          prop: 'open',
          value: false,
        },
      },
      children: [...(slots?.header?.generator() ?? []), ...(slots?.default?.generator() ?? [])],
    },
  ],
};

export const sheetStoryGrid: Story<'p-sheet'> = {
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
          target: 'p-sheet',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Sheet'],
    },
    {
      tag: 'p-sheet',
      properties,
      events: {
        onDismiss: {
          target: 'p-sheet',
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
        visualizeGridConfig,
        {
          tag: 'p-button-group',
          properties: { slot: 'footer' },
          children: [
            { tag: 'p-button', children: ['Accept'] },
            { tag: 'p-button', properties: { type: 'button', variant: 'secondary' }, children: ['Deny'] },
          ],
        },
      ],
    },
  ],
};
