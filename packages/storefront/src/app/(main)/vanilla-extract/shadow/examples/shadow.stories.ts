'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const shadowVanillaExtractStory: Story<'div'> = {
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
          children: ['boxShadow: shadowSm'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-medium rounded-lg p-fluid-sm',
          },
          children: ['boxShadow: shadowMd'],
        },
        {
          tag: 'div',
          properties: {
            className: 'shadow-high rounded-lg p-fluid-sm',
          },
          children: ['boxShadow: shadowLg'],
        },
      ],
    },
  ],
};
