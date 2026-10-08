'use client';

import type { Story } from '@/models/story';

const href = 'https://shop.porsche.com/de/de-DE/c/bags-and-luggage';
const label = 'Weekender – Porsche Design Travel Collection';

const swatch = (color: string, className: string, defaultChecked = false) => ({
  tag: 'input' as const,
  properties: {
    type: 'radio',
    name: 'tile-product-color',
    value: color.toLowerCase(),
    'aria-label': color,
    defaultChecked,
    // the transparent border and padding enlarge the target size to 24px while showing a 16px swatch
    className: `${className} appearance-none size-[24px] p-[3px] bg-clip-content rounded-full border border-transparent cursor-pointer motion-safe:transition-colors duration-sm ease-in-out hover:not-checked:border-contrast-medium checked:border-primary focus-visible:outline outline-focus outline-offset-2`,
  },
});

export const tileStoryProduct: Story<'p-tile'> = {
  previewMaxWidth: '400px',
  generator: () => [
    {
      tag: 'p-tile',
      properties: {
        aspectRatio: '3/4',
        className: 'group',
      },
      children: [
        { tag: 'a', properties: { slot: 'anchor', href }, children: [label] },
        {
          tag: 'p-tag',
          properties: { slot: 'top', variant: 'secondary' },
          children: ['New'],
        },
        {
          tag: 'p-button-pure',
          properties: {
            slot: 'top',
            icon: 'heart',
            hideLabel: true,
            className: 'ms-auto pointer-events-auto',
          },
          children: ['Add to wishlist'],
        },
        {
          tag: 'img',
          properties: {
            src: 'assets/weekender.webp',
            alt: '',
            width: 960,
            height: 1080,
            className:
              'grow basis-0 min-h-0 w-full object-contain mix-blend-multiply motion-safe:transition-transform duration-md ease-in-out group-has-[[slot=anchor]:hover]:scale-105',
          },
        },
        {
          tag: 'div',
          properties: { slot: 'bottom', className: 'mx-auto flex flex-col items-center gap-static-xs text-center' },
          children: [
            {
              tag: 'div',
              properties: { role: 'radiogroup', 'aria-label': 'Color', className: 'flex pointer-events-auto' },
              children: [swatch('Grey', 'bg-[#4b4b4d]', true), swatch('Cognac', 'bg-[#9a6a44]')],
            },
            { tag: 'p-text', properties: { className: 'line-clamp-2' }, children: [label] },
            { tag: 'p-text', properties: { color: 'contrast-medium' }, children: ['1.100,00 €'] },
          ],
        },
      ],
    },
  ],
};
