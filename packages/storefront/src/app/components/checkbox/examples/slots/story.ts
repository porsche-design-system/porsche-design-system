'use client';

import type { Story } from '@/models/story';

export const checkboxStorySlots: Story<'p-checkbox'> = {
  state: {
    properties: {
      name: 'some-name',
    } as any,
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'div',
      properties: { className: 'flex flex-col gap-static-sm' },
      children: [
        {
          tag: 'p-checkbox',
          properties,
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
              children: [
                'Some label with a ',
                {
                  tag: 'a',
                  properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
                  children: ['link'],
                },
              ],
            },
          ],
        },
        {
          tag: 'p-checkbox',
          properties,
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: ['Some slotted label'],
            },
          ],
        },
        {
          tag: 'p-checkbox',
          properties: { ...properties, disabled: 'true' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                'Disabled slotted label, a nested ',
                {
                  tag: 'a',
                  properties: { href: 'https://www.porsche.com', className: 'underline', tabindex: '-1' },
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
          tag: 'p-checkbox',
          properties: { ...properties, state: 'error' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                'Some slotted label with a nested ',
                {
                  tag: 'a',
                  properties: { href: 'https://www.porsche.com', className: 'underline' },
                  children: ['link'],
                },
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
              ],
            },
          ],
        },
      ],
    },
  ],
};

