'use client';

import { modalSlotStories } from '@/app/(main)/components/modal/configurator/story';
import type { Story } from '@/models/story';

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

