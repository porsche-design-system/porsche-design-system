'use client';

import type { Story } from '@/models/story';

export const borderRadiusScssStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'div',
          properties: { className: 'rounded-xs border p-fluid-md' },
          children: ['border-radius: $radius-xs;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-sm border p-fluid-md' },
          children: ['border-radius: $radius-sm;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-md border p-fluid-md' },
          children: ['border-radius: $radius-md;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-lg border p-fluid-md' },
          children: ['border-radius: $radius-lg;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-xl border p-fluid-md' },
          children: ['border-radius: $radius-xl;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-2xl border p-fluid-md' },
          children: ['border-radius: $radius-2xl;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-3xl border p-fluid-md' },
          children: ['border-radius: $radius-3xl;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-4xl border p-fluid-md' },
          children: ['border-radius: $radius-4xl;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-full border p-fluid-md' },
          children: ['border-radius: $radius-full;'],
        },
      ],
    },
  ],
};
