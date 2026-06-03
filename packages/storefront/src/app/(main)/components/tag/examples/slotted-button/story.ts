'use client';

import type { Story } from '@/models/story';

export const tagStorySlottedButton: Story<'p-tag'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'flex flex-wrap gap-static-md',
      },
      children: [
        {
          tag: 'p-tag',
          properties: { icon: 'car', variant: 'primary' },
          children: [{ tag: 'button', properties: { type: 'button' }, children: ['Variant primary'] }],
        },
        {
          tag: 'p-tag',
          properties: { variant: 'secondary' },
          children: [{ tag: 'button', properties: { type: 'button' }, children: ['Variant secondary'] }],
        },
        {
          tag: 'p-tag',
          properties: { variant: 'info' },
          children: [{ tag: 'button', properties: { type: 'button' }, children: ['Variant info'] }],
        },
        {
          tag: 'p-tag',
          properties: { variant: 'warning' },
          children: [{ tag: 'button', properties: { type: 'button' }, children: ['Variant warning'] }],
        },
        {
          tag: 'p-tag',
          properties: { variant: 'success' },
          children: [{ tag: 'button', properties: { type: 'button' }, children: ['Variant success'] }],
        },
        {
          tag: 'p-tag',
          properties: { variant: 'error' },
          children: [{ tag: 'button', properties: { type: 'button' }, children: ['Variant error'] }],
        },
      ],
    },
  ],
};

