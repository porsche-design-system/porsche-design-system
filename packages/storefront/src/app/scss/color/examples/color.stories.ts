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
          children: ['color: $color-primary | $color-primary-light | $color-primary-dark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-higher' },
          children: ['color: $color-contrast-higher | $color-contrast-higher-light | $color-contrast-higher-dark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-high' },
          children: ['color: $color-contrast-high | $color-contrast-high-light | $color-contrast-high-dark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-medium' },
          children: ['color: $color-contrast-medium | $color-contrast-medium-light | $color-contrast-medium-dark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success' },
          children: ['color: $color-success | $color-success-light | $color-success-dark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-warning' },
          children: ['color: $color-warning | $color-warning-light | $color-warning-dark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error' },
          children: ['color: $color-error | $color-error-light | $color-error-dark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-info' },
          children: ['color: $color-info | $color-info-light | $color-info-dark;'],
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
            'background-color: $color-canvas | $color-canvas-light | $color-canvas-dark;',
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
            'background-color: $color-surface | $color-surface-light | $color-surface-dark;',
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
            'background-color: $color-frosted | $color-frosted-light | $color-frosted-dark;',
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
            'background-color: $color-frosted-soft | $color-frosted-soft-light | $color-frosted-soft-dark;',
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
            'background-color: $color-frosted-strong | $color-frosted-strong-light | $color-frosted-strong-dark;',
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
            'background-color: $color-backdrop | $color-backdrop-light | $color-backdrop-dark;',
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
            'background-color: $color-success-frosted | $color-success-frosted-light | $color-success-frosted-dark;',
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
            'background-color: $color-success-frosted-soft | $color-success-frosted-soft-light | $color-success-frosted-soft-dark;',
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
            'background-color: $color-warning-frosted | $color-warning-frosted-light | $color-warning-frosted-dark;',
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
            'background-color: $color-warning-frosted-soft | $color-warning-frosted-soft-light | $color-warning-frosted-soft-dark;',
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
            'background-color: $color-error-frosted | $color-error-frosted-light | $color-error-frosted-dark;',
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
            'background-color: $color-error-frosted-soft | $color-error-frosted-soft-light | $color-error-frosted-soft-dark;',
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
            'background-color: $color-info-frosted | $color-info-frosted-light | $color-info-frosted-dark;',
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
            'background-color: $color-info-frosted-soft | $color-info-frosted-soft-light | $color-info-frosted-soft-dark;',
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
            'border-color: $color-primary | $color-primary-light | $color-primary-dark;',
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
            'border-color: $color-contrast-higher | $color-contrast-higher-light | $color-contrast-higher-dark;',
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
            'border-color: $color-contrast-high | $color-contrast-high-light | $color-contrast-high-dark;',
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
            'border-color: $color-contrast-medium | $color-contrast-medium-light | $color-contrast-medium-dark;',
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
            'border-color: $color-contrast-low | $color-contrast-low-light | $color-contrast-low-dark;',
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
            'border-color: $color-contrast-lower | $color-contrast-lower-light | $color-contrast-lower-dark;',
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
            'border-color: $color-info-medium | $color-info-medium-light | $color-info-medium-dark;',
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
            'border-color: $color-info-low | $color-info-low-light | $color-info-low-dark;',
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
            'border-color: $color-success-medium | $color-success-medium-light | $color-success-medium-dark;',
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
            'border-color: $color-success-low | $color-success-low-light | $color-success-low-dark;',
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
            'border-color: $color-warning-medium | $color-warning-medium-light | $color-warning-medium-dark;',
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
            'border-color: $color-warning-low | $color-warning-low-light | $color-warning-low-dark;',
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
            'border-color: $color-error-medium | $color-error-medium-light | $color-error-medium-dark;',
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
            'border-color: $color-error-low | $color-error-low-light | $color-error-low-dark;',
          ],
        },
      ],
    },
  ],
};
