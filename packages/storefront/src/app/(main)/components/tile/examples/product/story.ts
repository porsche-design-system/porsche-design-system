'use client';

import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

const label = 'Weekender – Porsche Design Travel Collection';

const createSwatch = (
  name: string,
  color: string,
  className: string,
  defaultChecked = false
): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'input',
  properties: {
    className: `${className} appearance-none size-6 p-static-xs bg-clip-content rounded-full border border-transparent cursor-pointer motion-safe:transition-colors duration-sm ease-in-out hover:not-checked:border-contrast-medium checked:border-primary focus-visible:outline outline-focus outline-offset-2`,
    type: 'radio',
    name,
    value: color.toLowerCase(),
    'aria-label': color,
    defaultChecked,
  },
});

const createColors = (name: string, className: string): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'div',
  properties: { className: `flex gap-static-2xs ${className}`, role: 'radiogroup', 'aria-label': 'Color' },
  children: [createSwatch(name, 'Grey', 'bg-[#4b4b4d]', true), createSwatch(name, 'Cognac', 'bg-[#9a6a44]')],
});

const price: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-text',
  properties: { color: 'contrast-medium', align: 'center' },
  children: ['1.100,00 €'],
};

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: {
    className: 'has-[[slot=anchor]:hover]:[--p-tile-media-scale:1.05]',
    aspectRatio: '3/4',
  },
  children: [
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: [label] },
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
        className: 'grow basis-0 min-h-0 w-full object-contain',
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
        createColors('tile-product-color', 'pointer-events-auto'),
        { tag: 'p-text', properties: { className: 'line-clamp-2', align: 'center' }, children: [label] },
        price,
      ],
    },
  ],
};

export const tileStoryProduct: Story<'p-tile'> = {
  previewMaxWidth: '400px',
  generator: () => [tile],
};
