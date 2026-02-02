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
          children: ['color: colorPrimary | colorPrimaryLight | colorPrimaryDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-higher' },
          children: ['color: colorContrastHigher | colorContrastHigherLight | colorContrastHigherDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-high' },
          children: ['color: colorContrastHigh | colorContrastHighLight | colorContrastHighDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-medium' },
          children: ['color: colorContrastMedium | colorContrastMediumLight | colorContrastMediumDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success' },
          children: ['color: colorSuccess | colorSuccessLight | colorSuccessDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success-medium' },
          children: ['color: colorSuccessMedium | colorSuccessMediumLight | colorSuccessMediumDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-warning' },
          children: ['color: colorWarning | colorWarningLight | colorWarningDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-warning-medium' },
          children: ['color: colorWarningMedium | colorWarningMediumLight | colorWarningMediumDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error' },
          children: ['color: colorError | colorErrorLight | colorErrorDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error-medium' },
          children: ['color: colorErrorMedium | colorErrorMediumLight | colorErrorMediumDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-info' },
          children: ['color: colorInfo | colorInfoLight | colorInfoDark;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-info-medium' },
          children: ['color: colorInfoMedium | colorInfoMediumLight | colorInfoMediumDark;'],
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
            'background-color: colorCanvas | colorCanvasLight | colorCanvasDark;',
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
            'background-color: colorSurface | colorSurfaceLight | colorSurfaceDark;',
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
            'background-color: colorFrosted | colorFrostedLight | colorFrostedDark;',
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
            'background-color: colorFrostedSoft | colorFrostedSoftLight | colorFrostedSoftDark;',
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
            'background-color: colorBackdrop | colorBackdropLight | colorBackdropDark;',
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
            'background-color: colorSuccessFrosted | colorSuccessFrostedLight | colorSuccessFrostedDark;',
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
            'background-color: colorSuccessFrostedSoft | colorSuccessFrostedSoftLight | colorSuccessFrostedSoftDark;',
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
            'background-color: colorWarningFrosted | colorWarningFrostedLight | colorWarningFrostedDark;',
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
            'background-color: colorWarningFrostedSoft | colorWarningFrostedSoftLight | colorWarningFrostedSoftDark;',
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
            'background-color: colorErrorFrosted | colorErrorFrostedLight | colorErrorFrostedDark;',
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
            'background-color: colorErrorFrostedSoft | colorErrorFrostedSoftLight | colorErrorFrostedSoftDark;',
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
            'background-color: colorInfoFrosted | colorInfoFrostedLight | colorInfoFrostedDark;',
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
            'background-color: colorInfoFrostedSoft | colorInfoFrostedSoftLight | colorInfoFrostedSoftDark;',
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
            'border-color: colorPrimary | colorPrimaryLight | colorPrimaryDark;',
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
            'border-color: colorContrastHigher | colorContrastHigherLight | colorContrastHigherDark;',
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
            'border-color: colorContrastHigh | colorContrastHighLight | colorContrastHighDark;',
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
            'border-color: colorContrastMedium | colorContrastMediumLight | colorContrastMediumDark;',
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
            'border-color: colorContrastLow | colorContrastLowLight | colorContrastLowDark;',
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
            'border-color: colorContrastLower | colorContrastLowerLight | colorContrastLowerDark;',
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
            'border-color: colorInfoMedium | colorInfoMediumLight | colorInfoMediumDark;',
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
            'border-color: colorInfoLow | colorInfoLowLight | colorInfoLowDark;',
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
            'border-color: colorSuccessMedium | colorSuccessMediumLight | colorSuccessMediumDark;',
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
            'border-color: colorSuccessLow | colorSuccessLowLight | colorSuccessLowDark;',
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
            'border-color: colorWarningMedium | colorWarningMediumLight | colorWarningMediumDark;',
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
            'border-color: colorWarningLow | colorWarningLowLight | colorWarningLowDark;',
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
            'border-color: colorErrorMedium | colorErrorMediumLight | colorErrorMediumDark;',
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
            'border-color: colorErrorLow | colorErrorLowLight | colorErrorLowDark;',
          ],
        },
      ],
    },
  ],
};
