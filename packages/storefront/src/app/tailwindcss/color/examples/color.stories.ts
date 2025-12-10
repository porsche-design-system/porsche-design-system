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
          properties: { className: 'text-contrast-higher' },
          children: ['.text-contrast-higher'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-high' },
          children: ['.text-contrast-high'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-medium' },
          children: ['.text-contrast-medium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-low' },
          children: ['.text-contrast-low'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success' },
          children: ['.text-success'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success-medium' },
          children: ['.text-success-medium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-warning' },
          children: ['.text-warning'],
        },
        {
          tag: 'li',
          properties: { className: 'text-warning-medium' },
          children: ['.text-warning-medium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error' },
          children: ['.text-error'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error-medium' },
          children: ['.text-error-medium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-info' },
          children: ['.text-info'],
        },
        {
          tag: 'li',
          properties: { className: 'text-info-medium' },
          children: ['.text-info-medium'],
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
              properties: { className: 'bg-canvas w-10 h-10 rounded-md border border-contrast-low' },
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
              properties: { className: 'bg-surface w-10 h-10 rounded-md border border-contrast-low' },
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
              properties: { className: 'bg-frosted w-10 h-10 rounded-md border border-contrast-low' },
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
              properties: { className: 'bg-frosted-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-frosted-soft',
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
              properties: { className: 'bg-backdrop w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-backdrop',
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
              properties: { className: 'bg-success-frosted w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-success-frosted',
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
              properties: { className: 'bg-success-frosted-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-success-frosted-soft',
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
              properties: { className: 'bg-warning-frosted w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-warning-frosted',
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
              properties: { className: 'bg-warning-frosted-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-warning-frosted-soft',
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
              properties: { className: 'bg-error-frosted w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-error-frosted',
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
              properties: { className: 'bg-error-frosted-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-error-frosted-soft',
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
              properties: { className: 'bg-info-frosted w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-info-frosted',
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
              properties: { className: 'bg-info-frosted-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-info-frosted-soft',
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
              properties: { className: 'border-primary w-10 h-10 rounded-md border' },
            },
            '.border-primary',
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
              properties: { className: 'border-contrast-higher w-10 h-10 rounded-md border' },
            },
            '.border-contrast-higher',
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
              properties: { className: 'border-contrast-high w-10 h-10 rounded-md border' },
            },
            '.border-contrast-high',
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
              properties: { className: 'border-contrast-medium w-10 h-10 rounded-md border' },
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
              properties: { className: 'border-contrast-low w-10 h-10 rounded-md border' },
            },
            '.border-contrast-low',
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
              properties: { className: 'border-contrast-lower w-10 h-10 rounded-md border' },
            },
            '.border-contrast-lower',
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
              properties: { className: 'border-info-medium w-10 h-10 rounded-md border' },
            },
            '.border-info-medium',
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
              properties: { className: 'border-info-low w-10 h-10 rounded-md border' },
            },
            '.border-info-low',
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
              properties: { className: 'border-success-medium w-10 h-10 rounded-md border' },
            },
            '.border-success-medium',
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
              properties: { className: 'border-success-low w-10 h-10 rounded-md border' },
            },
            '.border-success-low',
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
              properties: { className: 'border-warning-medium w-10 h-10 rounded-md border' },
            },
            '.border-warning-medium',
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
              properties: { className: 'border-warning-low w-10 h-10 rounded-md border' },
            },
            '.border-warning-low',
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
              properties: { className: 'border-error-medium w-10 h-10 rounded-md border' },
            },
            '.border-error-medium',
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
              properties: { className: 'border-error-low w-10 h-10 rounded-md border' },
            },
            '.border-error-low',
          ],
        },
      ],
    },
  ],
};
