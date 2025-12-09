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
          properties: { className: 'text-(--p-color-primary)' },
          children: ['--p-color-primary'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-contrast-higher)' },
          children: ['--p-color-contrast-higher'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-contrast-high)' },
          children: ['--p-color-contrast-high'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-contrast-medium)' },
          children: ['--p-color-contrast-medium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-contrast-low)' },
          children: ['--p-color-contrast-low'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-success)' },
          children: ['--p-color-success'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-success-medium)' },
          children: ['--p-color-success-medium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-warning)' },
          children: ['--p-color-warning'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-warning-medium)' },
          children: ['--p-color-warning-medium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-error)' },
          children: ['--p-color-error'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-error-medium)' },
          children: ['--p-color-error-medium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-info)' },
          children: ['--p-color-info'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-info-medium)' },
          children: ['--p-color-info-medium'],
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
              properties: { className: 'bg-(--p-color-canvas) w-10 h-10 rounded-md border border-contrast-low' },
            },
            '--p-color-canvas',
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
              properties: { className: 'bg-(--p-color-surface) w-10 h-10 rounded-md border border-contrast-low' },
            },
            '--p-color-surface',
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
              properties: { className: 'bg-(--p-color-frosted) w-10 h-10 rounded-md border border-contrast-low' },
            },
            '--p-color-frosted',
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
              properties: { className: 'bg-(--p-color-frosted-soft) w-10 h-10 rounded-md border border-contrast-low' },
            },
            '--p-color-frosted-soft',
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
              properties: { className: 'bg-(--p-color-backdrop) w-10 h-10 rounded-md border border-contrast-low' },
            },
            '--p-color-backdrop',
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
              properties: {
                className: 'bg-(--p-color-success-frosted) w-10 h-10 rounded-md border border-contrast-low',
              },
            },
            '--p-color-success-frosted',
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
              properties: {
                className: 'bg-(--p-color-success-frosted-soft) w-10 h-10 rounded-md border border-contrast-low',
              },
            },
            '--p-color-success-frosted-soft',
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
              properties: {
                className: 'bg-(--p-color-warning-frosted) w-10 h-10 rounded-md border border-contrast-low',
              },
            },
            '--p-color-warning-frosted',
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
              properties: {
                className: 'bg-(--p-color-warning-frosted-soft) w-10 h-10 rounded-md border border-contrast-low',
              },
            },
            '--p-color-warning-frosted-soft',
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
              properties: { className: 'bg-(--p-color-error-frosted) w-10 h-10 rounded-md border border-contrast-low' },
            },
            '--p-color-error-frosted',
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
              properties: {
                className: 'bg-(--p-color-error-frosted-soft) w-10 h-10 rounded-md border border-contrast-low',
              },
            },
            '--p-color-error-frosted-soft',
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
              properties: { className: 'bg-(--p-color-info-frosted) w-10 h-10 rounded-md border border-contrast-low' },
            },
            '--p-color-info-frosted',
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
              properties: {
                className: 'bg-(--p-color-info-frosted-soft) w-10 h-10 rounded-md border border-contrast-low',
              },
            },
            '--p-color-info-frosted-soft',
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
              properties: { className: 'border-(--p-color-primary) w-10 h-10 rounded-md border' },
            },
            '--p-color-primary',
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
              properties: { className: 'border-(--p-color-contrast-higher) w-10 h-10 rounded-md border' },
            },
            '--p-color-contrast-higher',
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
              properties: { className: 'border-(--p-color-contrast-high) w-10 h-10 rounded-md border' },
            },
            '--p-color-contrast-high',
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
              properties: { className: 'border-(--p-color-contrast-medium) w-10 h-10 rounded-md border' },
            },
            '--p-color-contrast-medium',
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
              properties: { className: 'border-(--p-color-contrast-low) w-10 h-10 rounded-md border' },
            },
            '--p-color-contrast-low',
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
              properties: { className: 'border-(--p-color-contrast-lower) w-10 h-10 rounded-md border' },
            },
            '--p-color-contrast-lower',
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
              properties: { className: 'border-(--p-color-info-medium) w-10 h-10 rounded-md border' },
            },
            '--p-color-info-medium',
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
              properties: { className: 'border-(--p-color-info-low) w-10 h-10 rounded-md border' },
            },
            '--p-color-info-low',
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
              properties: { className: 'border-(--p-color-success-medium) w-10 h-10 rounded-md border' },
            },
            '--p-color-success-medium',
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
              properties: { className: 'border-(--p-color-success-low) w-10 h-10 rounded-md border' },
            },
            '--p-color-success-low',
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
              properties: { className: 'border-(--p-color-warning-medium) w-10 h-10 rounded-md border' },
            },
            '--p-color-warning-medium',
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
              properties: { className: 'border-(--p-color-warning-low) w-10 h-10 rounded-md border' },
            },
            '--p-color-warning-low',
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
              properties: { className: 'border-(--p-color-error-medium) w-10 h-10 rounded-md border' },
            },
            '--p-color-error-medium',
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
              properties: { className: 'border-(--p-color-error-low) w-10 h-10 rounded-md border' },
            },
            '--p-color-error-low',
          ],
        },
      ],
    },
  ],
};
