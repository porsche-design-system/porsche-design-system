'use client';

import type { Story } from '@/models/story';

export const borderRadiusVanillaExtractStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'div',
          properties: { className: 'rounded-sm border p-fluid-sm' },
          children: ['borderRadius: borderRadiusSmall'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-md border p-fluid-sm' },
          children: ['borderRadius: borderRadiusMedium'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-lg border p-fluid-sm' },
          children: ['borderRadius: borderRadiusLarge'],
        },
      ],
    },
  ],
};

export const borderWidthVanillaExtractStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'border-thin p-fluid-sm',
          },
          children: ['borderWidth: borderWidthBase'],
        },
        {
          tag: 'div',
          properties: {
            className: 'border-regular p-fluid-sm',
          },
          children: ['borderWidth: borderWidthThin'],
        },
      ],
    },
  ],
};
