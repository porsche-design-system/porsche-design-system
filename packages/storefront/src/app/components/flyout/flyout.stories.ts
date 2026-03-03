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
        { tag: 'div', properties: { className: 'w-[10px] h-[120vh] bg-[deeppink]' } },
        { tag: 'p-text', children: ['Some Content End'] },
      ],
    },
  },
  footer: {
    basic: {
      name: 'Two Button Footer',
      generator: () => [
        {
          tag: 'div',
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
          tag: 'div',
          properties: { slot: 'footer', role: 'group', className: 'flex flex-wrap gap-fluid-sm max-xs:flex-col' },
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
