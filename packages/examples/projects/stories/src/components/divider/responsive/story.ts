'use client';

import type { Story } from '@porsche-design-system/story-generator';

export const dividerStoryResponsive: Story<'p-divider'> = {
  state: {
    properties: {
      direction: { base: 'horizontal', l: 'vertical' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'div',
      properties: {
        className: 'lg:flex lg:h-[150px]',
      },
      children: [
        {
          tag: 'p-divider',
          properties,
        },
      ],
    },
  ],
};
