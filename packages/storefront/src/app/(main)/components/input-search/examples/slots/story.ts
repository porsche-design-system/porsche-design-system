'use client';

import type { Story } from '@/models/story';

export const inputSearchStorySlots: Story<'p-input-search'> = {
  generator: () => [
    {
      tag: 'p-input-search',
      properties: { state: 'error' },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label' },
          children: [
            'Some label with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            ' and a "label-after" slot.',
          ],
        },
        {
          tag: 'p-popover',
          properties: { slot: 'label-after' },
          children: [
            'Some Popover content with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'description' },
          children: [
            'Some description with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
        {
          tag: 'p-icon',
          properties: { slot: 'start', name: 'pin', color: 'contrast-medium', 'aria-hidden': true },
        },
        {
          tag: 'p-button-pure',
          properties: {
            slot: 'end',
            icon: 'locate',
            hideLabel: true,
            className: 'p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)',
            aria: { 'aria-label': 'Locate' },
          },
        },
        {
          tag: 'span',
          properties: { slot: 'message' },
          children: [
            'Some error message with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
      ],
    },
  ],
};

