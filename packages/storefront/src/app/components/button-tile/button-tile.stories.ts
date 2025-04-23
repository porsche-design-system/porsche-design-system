'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const buttonTileStory: Story<'p-button-tile'> = {
  state: {
    properties: { label: 'Some label', description: 'Some Description' },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-button-tile',
      properties,
      children: [
        {
          tag: 'p-tag',
          properties: { slot: 'header', theme: 'dark', color: 'background-frosted', compact: true },
          children: ['Some tag'],
        },
        { tag: 'img', properties: { src: 'assets/lights.jpg', alt: 'Some image description' } },
      ],
    },
  ],
};

export const buttonTileStoryGrid: Story<'p-button-tile'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { style: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' } },
      children: [
        ...['4/3', '4/3', '1/1', '9/16', '1/1'].map((aspectRatio, index) => ({
          tag: 'p-button-tile',
          properties: {
            aspectRatio: aspectRatio,
            label: 'Some Label',
            description:
              index === 0
                ? 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
                : 'Some description',
            ...(index === 0 ? { size: 'large' } : {}),
          },
          children: [
            {
              tag: 'p-tag',
              properties: {
                slot: 'header',
                theme: 'dark',
                color: 'background-frosted',
                compact: 'true',
              },
              children: [aspectRatio],
            },
            {
              tag: 'img',
              properties: {
                src: 'assets/lights.jpg',
                alt: 'Some image description',
              },
            },
          ],
        })),
      ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
    },
  ],
};
