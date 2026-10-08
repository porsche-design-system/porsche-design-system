'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const createSwatch = (color: string, className: string, defaultChecked = false): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'input',
  properties: {
    className: `${className} appearance-none size-6 p-static-xs bg-clip-content rounded-full border border-transparent cursor-pointer motion-safe:transition-colors duration-sm ease-in-out hover:not-checked:border-contrast-medium checked:border-primary focus-visible:outline outline-focus outline-offset-2`,
    type: 'radio',
    name: 'tile-product-color',
    value: color.toLowerCase(),
    'aria-label': color,
    defaultChecked,
  },
});

export const tileStoryProduct: Story<'p-tile'> = {
  previewMaxWidth: '400px',
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        className: 'group',
        aspectRatio: '3/4',
      },
      children: [
        {
          tag: 'a',
          properties: { slot: 'anchor', href: '#' },
          children: ['Weekender – Porsche Design Travel Collection'],
        },
        { tag: 'p-tag', properties: { slot: 'top', variant: 'secondary' }, children: ['New'] },
        {
          tag: 'p-button-pure',
          properties: {
            slot: 'top',
            className: 'ms-auto pointer-events-auto p-static-xs -m-static-xs',
            icon: 'heart',
            hideLabel: true,
          },
          children: ['Add to wishlist'],
        },
        {
          tag: 'img',
          properties: {
            className:
              'grow basis-0 min-h-0 w-full object-contain motion-safe:transition-transform duration-md ease-in-out group-has-[[slot=anchor]:hover]:scale-105',
            src: 'assets/weekender.webp',
            alt: '',
            width: 960,
            height: 1080,
          },
        },
        {
          tag: 'div',
          properties: { slot: 'bottom', className: 'grow flex flex-col items-center gap-static-xs' },
          children: [
            {
              tag: 'div',
              properties: {
                className: 'flex gap-static-2xs pointer-events-auto',
                role: 'radiogroup',
                'aria-label': 'Color',
              },
              children: [createSwatch('Grey', 'bg-[#4b4b4d]', true), createSwatch('Cognac', 'bg-[#9a6a44]')],
            },
            {
              tag: 'p-text',
              properties: { className: 'line-clamp-2', align: 'center' },
              children: ['Weekender – Porsche Design Travel Collection'],
            },
            { tag: 'p-text', properties: { color: 'contrast-medium', align: 'center' }, children: ['1.100,00 €'] },
          ],
        },
      ],
    },
  ],
};
