'use client';

import { visualizeGridConfig } from '@/app/components/grid/grid.stories';
import type { SlotStories, Story } from '@/models/story';

export const flyoutSlotStories: SlotStories<'p-flyout'> = {
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
  footer: {
    basic: {
      name: 'Two Button Footer',
      generator: () => [
        {
          tag: 'p-button-group',
          properties: { slot: 'footer' },
          children: [
            { tag: 'p-button', properties: { type: 'button' }, children: ['Proceed'] },
            { tag: 'p-button', properties: { type: 'button', variant: 'secondary' }, children: ['Cancel'] },
          ],
        },
      ],
    },
  },
  'sub-footer': {
    basic: {
      name: 'Basic Sub-Footer',
      generator: () => [
        { tag: 'p-text', properties: { slot: 'sub-footer' }, children: ['Some additional Sub-Footer'] },
      ],
    },
  },
};

export const flyoutStory: Story<'p-flyout'> = {
  state: {
    properties: {
      open: false,
      aria: { 'aria-label': 'Some Heading' },
    },
    slots: {
      header: flyoutSlotStories.header.basic,
      default: flyoutSlotStories.default.basic,
      footer: flyoutSlotStories.footer.basic,
      'sub-footer': flyoutSlotStories['sub-footer'].basic,
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
        ...(slots?.header?.generator() ?? []),
        ...(slots?.default?.generator() ?? []),
        ...(slots?.footer?.generator() ?? []),
        ...(slots?.['sub-footer']?.generator() ?? []),
      ],
    },
  ],
};

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
            style: {
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '16px',
              alignItems: 'flex-start',
            },
          },
          children: [
            {
              tag: 'div',
              properties: {
                style: {
                  position: 'sticky',
                  top: 'calc(var(--p-flyout-sticky-top, 0) + 16px)',
                  padding: '16px',
                  background: 'rgba(255, 0, 0, 0.1)',
                },
              },
              children: ['Some sticky element within content relying on --p-flyout-sticky-top'],
            },
            {
              tag: 'div',
              children: [
                { tag: 'p-text', children: ['Some Content Begin'] },
                { tag: 'div', properties: { style: { width: '10px', height: '120vh', background: 'deeppink' } } },
                { tag: 'p-text', children: ['Some Content End'] },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const flyoutStoryGrid: Story<'p-flyout'> = {
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
        visualizeGridConfig,
        {
          tag: 'p-button-group',
          properties: { slot: 'footer' },
          children: [
            { tag: 'p-button', properties: { type: 'button' }, children: ['Proceed'] },
            { tag: 'p-button', properties: { type: 'button', variant: 'secondary' }, children: ['Cancel'] },
          ],
        },
        {
          tag: 'p-text',
          properties: { slot: 'sub-footer' },
          children: ['Some additional Sub-Footer'],
        },
      ],
    },
  ],
};
