'use client';

import type { Story } from '@/models/story';

export const colorStoryTextColor: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: {
        className: 'grid gap-fluid-sm prose-text-sm',
      },
      children: [
        {
          tag: 'li',
          properties: { className: 'text-primary' },
          children: ['.text-primary'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-medium' },
          children: ['.text-contrast-medium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-high' },
          children: ['.text-contrast-high'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success' },
          children: ['.text-success'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error' },
          children: ['.text-error'],
        },
      ],
    },
  ],
};

export const colorStoryBackgroundColor: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: {
        className: 'grid gap-fluid-sm prose-text-sm',
      },
      children: [
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-canvas w-10 h-10 rounded-md border border-contrast-20' },
            },
            '.bg-canvas',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface w-10 h-10 rounded-md border border-contrast-20' },
            },
            '.bg-surface',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-scrim w-10 h-10 rounded-md border border-contrast-20' },
            },
            '.bg-scrim',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-frosted w-10 h-10 rounded-md border border-contrast-20' },
            },
            '.bg-frosted',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-success-soft w-10 h-10 rounded-md border border-contrast-20' },
            },
            '.bg-success-soft',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-warning-soft w-10 h-10 rounded-md border border-contrast-20' },
            },
            '.bg-warning-soft',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-error-soft w-10 h-10 rounded-md border border-contrast-20' },
            },
            '.bg-error-soft',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-info-soft w-10 h-10 rounded-md border border-contrast-20' },
            },
            '.bg-info-soft',
          ],
        },
      ],
    },
  ],
};

export const colorStoryBorderColor: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: {
        className: 'grid gap-fluid-sm prose-text-sm',
      },
      children: [
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'border-contrast-20 w-10 h-10 rounded-md border' },
            },
            '.border-contrast-20',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'border-contrast-50 w-10 h-10 rounded-md border' },
            },
            '.border-contrast-medium',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'border-contrast-80 w-10 h-10 rounded-md border' },
            },
            '.border-contrast-high',
          ],
        },
      ],
    },
  ],
};
