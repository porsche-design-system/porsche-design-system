'use client';

import type { Story } from '@/models/story';

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

