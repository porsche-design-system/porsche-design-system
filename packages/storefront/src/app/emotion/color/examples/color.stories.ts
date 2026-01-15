'use client';

import type { Story } from '@/models/story';

export const colorEmotionStoryTextColor: Story<'div'> = {
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
          children: ['color: theme{Light|Dark}Primary'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-high' },
          children: ['color: theme{Light|Dark}ContrastHigh'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-medium' },
          children: ['color: theme{Light|Dark}ContrastMedium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-low' },
          children: ['color: theme{Light|Dark}ContrastLow'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success' },
          children: ['color: theme{Light|Dark}NotificationSuccess'],
        },
        {
          tag: 'li',
          properties: { className: 'text-warning' },
          children: ['color: theme{Light|Dark}NotificationWarning'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error' },
          children: ['color: theme{Light|Dark}NotificationError'],
        },
        {
          tag: 'li',
          properties: { className: 'text-info' },
          children: ['color: theme{Light|Dark}NotificationInfo'],
        },
      ],
    },
  ],
};

export const colorEmotionStoryBackgroundColor: Story<'div'> = {
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
            'backgroundColor: theme{Light|Dark}BackgroundBase',
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
            'backgroundColor: theme{Light|Dark}BackgroundSurface',
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
            'backgroundColor: theme{Light|Dark}BackgroundFrosted',
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
            'backgroundColor: theme{Light|Dark}BackgroundShading',
          ],
        },
      ],
    },
  ],
};

export const colorEmotionStoryBorderColor: Story<'div'> = {
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
            'borderColor: theme{Light|Dark}Primary',
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
            'borderColor: theme{Light|Dark}ContrastHigh',
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
            'borderColor: theme{Light|Dark}ContrastMedium',
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
            'borderColor: theme{Light|Dark}ContrastLow',
          ],
        },
      ],
    },
  ],
};
