'use client';

import type { Story } from '@/models/story';

export const radioGroupStorySlots: Story<'p-radio-group'> = {
  generator: () => [
    {
      tag: 'p-radio-group',
      properties: { state: 'error', value: 'a' },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label' },
          children: [
            'Some slotted label with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            ' text and a "label-after" slot.',
          ],
        },
        {
          tag: 'p-popover',
          properties: { slot: 'label-after' },
          children: ['Some Popover description'],
        },
        {
          tag: 'span',
          properties: { slot: 'description' },
          children: [
            'Some slotted description with a ',
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
          properties: { slot: 'message' },
          children: [
            'Some slotted error message with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
        {
          tag: 'p-radio-group-option',
          properties: { value: 'a' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                {
                  tag: 'img',
                  properties: {
                    src: 'assets/911.png',
                    alt: '',
                    className: 'object-contain inline-block align-middle -mt-2 me-static-sm w-[70px]',
                  },
                },
                'Some slotted label with custom content and a "label-after" slot',
              ],
            },
            {
              tag: 'p-popover',
              properties: { slot: 'label-after' },
              children: ['Option A with slotted label and a popover '],
            },
          ],
        },
        {
          tag: 'p-radio-group-option',
          properties: { value: 'b' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: ['Option B with slotted label'],
            },
          ],
        },
        {
          tag: 'p-radio-group-option',
          properties: { value: 'c', disabled: 'true' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                'Disabled Option C with slotted label, a nested ',
                {
                  tag: 'a',
                  properties: { href: 'https://www.porsche.com', className: 'underline' },
                  children: ['link'],
                },
                ' and a label-after slot.',
              ],
            },
            {
              tag: 'p-popover',
              properties: { slot: 'label-after' },
              children: ['Some information about the disabled state.'],
            },
          ],
        },
        {
          tag: 'p-radio-group-option',
          properties: { value: 'd' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                'Option C with slotted label and a nested ',
                {
                  tag: 'a',
                  properties: { href: 'https://www.porsche.com', className: 'underline' },
                  children: ['link'],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

