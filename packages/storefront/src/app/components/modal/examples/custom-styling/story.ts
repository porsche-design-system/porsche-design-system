'use client';

import type { Story } from '@/models/story';

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
            className:
              '-mt-(--ref-p-modal-pt) -mx-(--ref-p-modal-px) -mb-(--ref-p-modal-pb) max-w-(--p-modal-width) rounded-xl',
          },
        },
      ],
    },
  ],
};

