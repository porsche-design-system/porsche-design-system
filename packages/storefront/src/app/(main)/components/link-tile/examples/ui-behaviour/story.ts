'use client';

import type { Story } from '@/models/story';
import type { ElementConfig } from '@/utils/generator/generator';

export const linkTileStoryLayout: Story<'p-link-tile'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid grid-cols-2 gap-static-md',
      },
      children: [
        {
          tag: 'p-link-tile',
          properties: {
            aspectRatio: '4/3',
            href: '#',
            label: 'Some Label',
            size: 'large',
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
          },
          children: [
            {
              tag: 'p-tag',
              properties: {
                slot: 'header',
                color: 'background-frosted',
                compact: true,
              },
              children: ['4/3'],
            },
            {
              tag: 'img',
              properties: {
                src: 'assets/lights.jpg',
                alt: 'Some image description',
              },
            },
          ],
        },
        ...(['4/3', '1/1', '9/16', '1/1'].map((ratio) => ({
          tag: 'p-link-tile',
          properties: {
            aspectRatio: ratio,
            href: '#',
            label: 'Some Label',
            description: 'Some description',
          },
          children: [
            {
              tag: 'p-tag',
              properties: {
                slot: 'header',
                color: 'background-frosted',
                compact: 'true',
              },
              children: [ratio],
            },
            {
              tag: 'img',
              properties: {
                src: 'assets/lights.jpg',
                alt: 'Some image description',
              },
            },
          ],
        })) as ElementConfig<'p-link-tile'>[]),
      ],
    },
  ],
};

