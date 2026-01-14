'use client';

import type { Story } from '@/models/story';

export const borderRadiusScssStory: Story<'div'> = {
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
          children: ['border-radius: $pds-border-radius-small'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-md border p-fluid-sm' },
          children: ['border-radius: $pds-border-radius-medium'],
        },
        {
          tag: 'div',
          properties: { className: 'rounded-lg border p-fluid-sm' },
          children: ['border-radius: $pds-border-radius-large'],
        },
      ],
    },
  ],
};

export const borderWidthScssStory: Story<'div'> = {
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
          children: ['border-width: $pds-border-width-thin'],
        },
        {
          tag: 'div',
          properties: {
            className: 'border-regular p-fluid-sm',
          },
          children: ['border-width: $pds-border-width-regular'],
        },
      ],
    },
  ],
};
