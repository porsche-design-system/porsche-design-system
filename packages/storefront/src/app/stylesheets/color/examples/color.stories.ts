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
          children: ['color: var(--p-color-primary)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-contrast-higher)' },
          children: ['color: var(--p-color-contrast-higher)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-contrast-high)' },
          children: ['color: var(--p-color-contrast-high)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-contrast-medium)' },
          children: ['color: var(--p-color-contrast-medium)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-contrast-low)' },
          children: ['color: var(--p-color-contrast-low)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-success)' },
          children: ['color: var(--p-color-success)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-success-medium)' },
          children: ['color: var(--p-color-success-medium)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-warning)' },
          children: ['color: var(--p-color-warning)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-warning-medium)' },
          children: ['color: var(--p-color-warning-medium)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-error)' },
          children: ['color: var(--p-color-error)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-error-medium)' },
          children: ['color: var(--p-color-error-medium)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-info)' },
          children: ['color: var(--p-color-info)'],
        },
        {
          tag: 'li',
          properties: { className: 'text-(--p-color-info-medium)' },
          children: ['color: var(--p-color-info-medium)'],
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
            'background-color: var(--p-color-canvas)',
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
            'background-color: var(--p-color-surface)',
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
            'background-color: var(--p-color-frosted)',
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
            'background-color: var(--p-color-frosted-soft)',
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
            'background-color: var(--p-color-backdrop)',
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
            'background-color: var(--p-color-success-frosted)',
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
            'background-color: var(--p-color-success-frosted-soft)',
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
            'background-color: var(--p-color-warning-frosted)',
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
            'background-color: var(--p-color-warning-frosted-soft)',
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
            'background-color: var(--p-color-error-frosted)',
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
            'background-color: var(--p-color-error-frosted-soft)',
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
            'background-color: var(--p-color-info-frosted)',
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
            'background-color: var(--p-color-info-frosted-soft)',
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
            'border-color: var(--p-color-primary)',
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
            'border-color: var(--p-color-contrast-higher)',
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
            'border-color: var(--p-color-contrast-high)',
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
            'border-color: var(--p-color-contrast-medium)',
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
            'border-color: var(--p-color-contrast-low)',
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
            'border-color: var(--p-color-contrast-lower)',
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
            'border-color: var(--p-color-info-medium)',
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
            'border-color: var(--p-color-info-low)',
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
            'border-color: var(--p-color-success-medium)',
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
            'border-color: var(--p-color-success-low)',
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
            'border-color: var(--p-color-warning-medium)',
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
            'border-color: var(--p-color-warning-low)',
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
            'border-color: var(--p-color-error-medium)',
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
            'border-color: var(--p-color-error-low)',
          ],
        },
      ],
    },
  ],
};
