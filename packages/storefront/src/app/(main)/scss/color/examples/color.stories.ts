'use client';

import type { Story } from '@/models/story';

export const colorScssStoryTextColor: Story<'div'> = {
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
          children: ['color: $color-primary;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-higher' },
          children: ['color: $color-contrast-higher;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-high' },
          children: ['color: $color-contrast-high;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-medium' },
          children: ['color: $color-contrast-medium;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success' },
          children: ['color: $color-success;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-warning' },
          children: ['color: $color-warning;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error' },
          children: ['color: $color-error;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-info' },
          children: ['color: $color-info;'],
        },
      ],
    },
  ],
};

export const colorScssStoryBackgroundColor: Story<'div'> = {
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
            'background-color: $color-canvas;',
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
            'background-color: $color-surface;',
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
            'background-color: $color-frosted;',
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
            'background-color: $color-frosted-soft;',
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
              properties: { className: 'bg-frosted-strong w-10 h-10 rounded-md border border-contrast-low' },
            },
            'background-color: $color-frosted-strong;',
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
            'background-color: $color-backdrop;',
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
            'background-color: $color-success-frosted;',
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
            'background-color: $color-success-frosted-soft;',
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
            'background-color: $color-warning-frosted;',
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
            'background-color: $color-warning-frosted-soft;',
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
            'background-color: $color-error-frosted;',
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
            'background-color: $color-error-frosted-soft;',
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
            'background-color: $color-info-frosted;',
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
            'background-color: $color-info-frosted-soft;',
          ],
        },
      ],
    },
  ],
};

export const colorScssStoryBorderColor: Story<'div'> = {
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
            'border-color: $color-primary;',
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
            'border-color: $color-contrast-higher;',
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
            'border-color: $color-contrast-high;',
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
            'border-color: $color-contrast-medium;',
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
            'border-color: $color-contrast-low;',
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
            'border-color: $color-contrast-lower;',
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
            'border-color: $color-info-medium;',
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
            'border-color: $color-info-low;',
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
            'border-color: $color-success-medium;',
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
            'border-color: $color-success-low;',
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
            'border-color: $color-warning-medium;',
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
            'border-color: $color-warning-low;',
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
            'border-color: $color-error-medium;',
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
            'border-color: $color-error-low;',
          ],
        },
      ],
    },
  ],
};
