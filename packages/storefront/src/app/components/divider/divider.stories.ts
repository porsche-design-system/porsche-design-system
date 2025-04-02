'use client';

import type { Story } from '@/models/story';

export const dividerStory: Story<'p-divider'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-divider',
      properties,
    },
  ],
};

export const dividerStoryVertical: Story<'p-divider'> = {
  state: {
    properties: {
      direction: 'vertical',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'div',
      properties: {
        style: {
          display: 'flex',
          height: '100px',
        },
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
        className: 'divider-vertical-responsive-container-example',
      },
      children: [
        {
          tag: 'p-divider',
          properties,
        },
      ],
    },
    {
      tag: 'style',
      children: [
        `@media (min-width: 1300px) {
    .divider-vertical-responsive-container-example {
        display: flex;
        height: 100px;
    }
  }`,
      ],
    },
  ],
};
