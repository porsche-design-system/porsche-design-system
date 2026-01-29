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
          children: ['border-radius: $border-radius-xs;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-sm border p-fluid-md' },
          children: ['border-radius: $border-radius-sm;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-md border p-fluid-md' },
          children: ['border-radius: $border-radius-md;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-lg border p-fluid-md' },
          children: ['border-radius: $border-radius-lg;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-xl border p-fluid-md' },
          children: ['border-radius: $border-radius-xl;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-2xl border p-fluid-md' },
          children: ['border-radius: $border-radius-2xl;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-3xl border p-fluid-md' },
          children: ['border-radius: $border-radius-3xl;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-4xl border p-fluid-md' },
          children: ['border-radius: $border-radius-4xl;'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-full border p-fluid-md' },
          children: ['border-radius: $border-radius-full;'],
        },
      ],
    },
  ],
};

export const borderWidthScssStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'border-1 p-fluid-md',
          },
          children: ['border-width: $border-width-1;'],
        },
        {
          tag: 'div',
          properties: {
            className: 'border-2 p-fluid-md',
          },
          children: ['border-width: $border-width-2;'],
        },
      ],
    },
  ],
};
