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
          children: ['color: colorPrimary'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-higher' },
          children: ['color: colorContrastHigher'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-high' },
          children: ['color: colorContrastHigh'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-medium' },
          children: ['color: colorContrastMedium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success' },
          children: ['color: colorSuccess'],
        },
        {
          tag: 'li',
          properties: { className: 'text-warning' },
          children: ['color: colorWarning'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error' },
          children: ['color: colorError'],
        },
        {
          tag: 'li',
          properties: { className: 'text-info' },
          children: ['color: colorInfo'],
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
            'backgroundColor: colorCanvas',
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
            'backgroundColor: colorSurface',
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
            'backgroundColor: colorFrosted',
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
            'backgroundColor: colorFrostedSoft',
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
            'backgroundColor: colorFrostedStrong',
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
            'backgroundColor: colorBackdrop',
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
            'backgroundColor: colorSuccessFrosted',
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
            'backgroundColor: colorSuccessFrostedSoft',
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
            'backgroundColor: colorWarningFrosted',
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
            'backgroundColor: colorWarningFrostedSoft',
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
            'backgroundColor: colorErrorFrosted',
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
            'backgroundColor: colorErrorFrostedSoft',
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
            'backgroundColor: colorInfoFrosted',
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
            'backgroundColor: colorInfoFrostedSoft',
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
            'borderColor: colorPrimary',
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
            'borderColor: colorContrastHigher',
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
            'borderColor: colorContrastHigh',
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
            'borderColor: colorContrastMedium',
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
            'borderColor: colorContrastLow',
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
            'borderColor: colorContrastLower',
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
            'borderColor: colorInfoMedium',
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
            'borderColor: colorInfoLow',
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
            'borderColor: colorSuccessMedium',
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
            'borderColor: colorSuccessLow',
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
            'borderColor: colorWarningMedium',
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
            'borderColor: colorWarningLow',
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
            'borderColor: colorErrorMedium',
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
            'borderColor: colorErrorLow',
          ],
        },
      ],
    },
  ],
};
