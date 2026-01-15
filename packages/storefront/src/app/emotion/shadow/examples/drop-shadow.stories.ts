'use client';

import type { Story } from '@/models/story';

export const shadowEmotionStory: Story<'div'> = {
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
            className: 'shadow-low rounded-lg p-fluid-sm',
          },
          children: ['...dropShadowLowStyle'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-medium rounded-lg p-fluid-sm',
          },
          children: ['...dropShadowMediumStyle'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-high rounded-lg p-fluid-sm',
          },
          children: ['...dropShadowHighStyle'],
        },
      ],
    },
  ],
};
