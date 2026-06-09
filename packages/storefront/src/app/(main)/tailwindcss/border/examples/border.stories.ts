'use client';

import type { Story } from '@/models/story';

export const borderRadiusStory: Story<'div'> = {
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
          children: ['.rounded-xs'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-sm border p-fluid-md' },
          children: ['.rounded-sm'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-md border p-fluid-md' },
          children: ['.rounded-md'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-lg border p-fluid-md' },
          children: ['.rounded-lg'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-xl border p-fluid-md' },
          children: ['.rounded-xl'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-2xl border p-fluid-md' },
          children: ['.rounded-2xl'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-3xl border p-fluid-md' },
          children: ['.rounded-3xl'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-4xl border p-fluid-md' },
          children: ['.rounded-4xl'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-full border p-fluid-md' },
          children: ['.rounded-full'],
        },
      ],
    },
  ],
};

export const borderWidthStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'div',
          properties: { className: 'border p-fluid-md' },
          children: ['.border'],
        },
        {
          tag: 'div',
          properties: {
            className: 'border-1 p-fluid-md',
          },
          children: ['.border-1'],
        },
        {
          tag: 'div',
          properties: {
            className: 'border-2 p-fluid-md',
          },
          children: ['.border-2'],
        },
      ],
    },
  ],
};
