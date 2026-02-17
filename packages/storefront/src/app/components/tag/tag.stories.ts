'use client';

import type { Story } from '@/models/story';

export const tagStory: Story<'p-tag'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tag',
      properties,
      children: ['Some label'],
    },
  ],
};

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

export const tagStorySlottedLink: Story<'p-tag'> = {
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
          children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Variant primary'] }],
        },
        {
          tag: 'p-tag',
          properties: { variant: 'secondary' },
          children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Variant secondary'] }],
        },
        {
          tag: 'p-tag',
          properties: { variant: 'info' },
          children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Variant info'] }],
        },
        {
          tag: 'p-tag',
          properties: { variant: 'warning' },
          children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Variant warning'] }],
        },
        {
          tag: 'p-tag',
          properties: { variant: 'success' },
          children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Variant success'] }],
        },
        {
          tag: 'p-tag',
          properties: { variant: 'error' },
          children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Variant error'] }],
        },
      ],
    },
  ],
};

export const tagStoryMultiline: Story<'p-tag'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'w-[100px]',
      },
      children: [
        {
          tag: 'p-tag',
          properties: { variant: 'success', className: 'whitespace-normal' },
          children: ['Some label with longer text wrapped in a narrow container'],
        },
      ],
    },
  ],
};
