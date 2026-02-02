'use client';

import type { Story } from '@/models/story';

export const borderRadiusVanillaExtractStory: Story<'div'> = {
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
          children: ['borderRadius: radiusXs'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-sm border p-fluid-md' },
          children: ['borderRadius: radiusSm'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-md border p-fluid-md' },
          children: ['borderRadius: radiusMd'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-lg border p-fluid-md' },
          children: ['borderRadius: radiusLg'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-xl border p-fluid-md' },
          children: ['borderRadius: radiusXl'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-2xl border p-fluid-md' },
          children: ['borderRadius: radius2Xl'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-3xl border p-fluid-md' },
          children: ['borderRadius: radius3Xl'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-4xl border p-fluid-md' },
          children: ['borderRadius: radius4Xl'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-full border p-fluid-md' },
          children: ['borderRadius: radiusFull'],
        },
      ],
    },
  ],
};
