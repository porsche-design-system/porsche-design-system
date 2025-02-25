'use client';

import type { Story } from '@/models/story';

export const flexStory: Story<'p-flex'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-flex',
      properties: { ...properties, className: 'example-flex' },
      children: [
        { tag: 'p-flex-item', children: ['1'] },
        { tag: 'p-flex-item', children: ['2'] },
      ],
    },
    {
      tag: 'p-flex',
      properties: {
        className: 'example-flex',
      },
      children: [
        { tag: 'p-flex-item', children: ['1'] },
        { tag: 'p-flex-item', children: ['2'] },
      ],
    },
    {
      tag: 'style',
      children: [
        `.example-flex > :nth-child(1n) {
    background-color: #87cefa;
  }
  .example-flex > :nth-child(2n) {
    background-color: #00bfff;
  }
  .example-flex > * {
    padding: 0 6vw;
    color: #010205;
    text-align: center;
  }`,
      ],
    },
  ],
};
