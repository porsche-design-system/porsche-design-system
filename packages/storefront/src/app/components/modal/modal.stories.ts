'use client';

import { visualizeGridConfig } from '@/app/components/grid/grid.stories';
import type { SlotStories, Story } from '@/models/story';

export const modalSlotStories: SlotStories<'p-modal'> = {
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
          properties: { slot: 'footer', role: 'group', className: 'flex flex-wrap gap-fluid-sm max-xs:flex-col' },
          children: [
            { tag: 'p-button', properties: { type: 'button' }, children: ['Proceed'] },
            { tag: 'p-button', properties: { type: 'button', variant: 'secondary' }, children: ['Cancel'] },
          ],
        },
      ],
    },
  },
};

export const modalStory: Story<'p-modal'> = {
  state: {
    properties: {
      open: false,
      aria: { 'aria-label': 'Some Heading' },
    },
    slots: {
      header: modalSlotStories.header.basic,
      default: modalSlotStories.default.basic,
      footer: modalSlotStories.footer.basic,
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
          target: 'p-modal',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Modal'],
    },
    {
      tag: 'p-modal',
      properties,
      events: {
        onDismiss: {
          target: 'p-modal',
          prop: 'open',
          value: false,
        },
      },
      children: [
        ...(slots?.header?.generator() ?? []),
        ...(slots?.default?.generator() ?? []),
        ...(slots?.footer?.generator() ?? []),
      ],
    },
  ],
};

export const modalStoryScrollable: Story<'p-modal'> = {
  state: {
    properties: {
      open: false,
      aria: { 'aria-label': 'Some Heading' },
    },
    slots: {
      header: modalSlotStories.header.basic,
      default: modalSlotStories.default.scrollable,
      footer: modalSlotStories.footer.basic,
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
          target: 'p-modal',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Modal'],
    },
    {
      tag: 'p-modal',
      properties,
      events: {
        onDismiss: {
          target: 'p-modal',
          prop: 'open',
          value: false,
        },
      },
      children: [
        ...(slots?.header?.generator() ?? []),
        ...(slots?.default?.generator() ?? []),
        ...(slots?.footer?.generator() ?? []),
      ],
    },
  ],
};

export const modalStoryGrid: Story<'p-modal'> = {
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
          target: 'p-modal',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Modal'],
    },
    {
      tag: 'p-modal',
      properties,
      events: {
        onDismiss: {
          target: 'p-modal',
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
            { tag: 'p-button', properties: { type: 'button' }, children: ['Accept'] },
            { tag: 'p-button', properties: { type: 'button', variant: 'secondary' }, children: ['Deny'] },
          ],
        },
      ],
    },
  ],
};

export const modalStoryAlertDialog: Story<'p-modal'> = {
  state: {
    properties: {
      open: false,
      aria: { role: 'alertdialog' },
      disableBackdropClick: true,
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
          target: 'p-modal',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Modal'],
    },
    {
      tag: 'p-modal',
      properties,
      events: {
        onDismiss: {
          target: 'p-modal',
          prop: 'open',
          value: false,
        },
      },
      children: [
        {
          tag: 'p-heading',
          properties: { slot: 'header', size: 'large', tag: 'h2' },
          children: ['Some important Heading'],
        },
        {
          tag: 'p-text',
          children: ['Some important Content'],
        },
        {
          tag: 'div',
          properties: { slot: 'footer', role: 'group', className: 'flex flex-wrap gap-fluid-sm max-xs:flex-col' },
          children: [
            { tag: 'p-button', properties: { type: 'button' }, children: ['Accept'] },
            { tag: 'p-button', properties: { type: 'button', variant: 'secondary' }, children: ['Deny'] },
          ],
        },
      ],
    },
  ],
};

export const modalStoryCustomStyling: Story<'p-modal'> = {
  state: {
    properties: {
      open: false,
      backdrop: 'shading',
      aria: { 'aria-label': 'Some Label' },
      className:
        '[--p-modal-width:clamp(276px,45.25vw+131px,1000px)] [--p-modal-spacing-top:200px] [--p-modal-spacing-bottom:50px]',
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
          target: 'p-modal',
          prop: 'open',
          value: true,
        },
      },
      children: ['Open Modal'],
    },
    {
      tag: 'p-modal',
      properties,
      events: {
        onDismiss: {
          target: 'p-modal',
          prop: 'open',
          value: false,
        },
      },
      children: [
        {
          tag: 'img',
          properties: {
            src: 'assets/porsche-992-carrera-s.jpg',
            className: '-mt-(--ref-p-modal-pt) -mx-(--ref-p-modal-px) -mb-(--ref-p-modal-pb)',
          },
        },
      ],
    },
  ],
};
