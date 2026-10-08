'use client';

import { createComparison, stretchedLinkClassName } from '@/app/(main)/components/tile/examples/comparison';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

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
    className: 'group',
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
        createColors('tile-product-color', 'pointer-events-auto'),
        { tag: 'p-text', properties: { className: 'line-clamp-2', align: 'center' }, children: [label] },
        price,
      ],
    },
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'article',
  properties: {
    className:
      'group relative isolate flex flex-col gap-fluid-sm p-fluid-md aspect-[3/4] rounded-3xl bg-surface text-primary',
  },
  children: [
    {
      tag: 'div',
      properties: { className: 'flex items-center gap-fluid-sm' },
      children: [
        { tag: 'p-tag', properties: { variant: 'secondary' }, children: ['New'] },
        {
          // independent action, `relative z-2` places it above the stretched link, so it is clickable
          tag: 'p-button-pure',
          properties: {
            className: 'relative z-2 ms-auto p-static-xs -m-static-xs',
            icon: 'heart',
            hideLabel: true,
          },
          children: ['Add to wishlist'],
        },
      ],
    },
    {
      tag: 'img',
      properties: {
        className:
          'grow basis-0 min-h-0 w-full object-contain motion-safe:transition-transform duration-md ease-in-out group-has-[a:hover]:scale-105',
        src: 'assets/weekender.webp',
        alt: '',
        width: 960,
        height: 1080,
      },
    },
    {
      tag: 'div',
      properties: { className: 'flex flex-col items-center gap-static-xs' },
      children: [
        // independent action, `relative z-2` places the color swatches above the stretched link, so they are selectable
        createColors('tile-product-color-tailwind', 'relative z-2'),
        {
          tag: 'p-text',
          properties: { className: 'line-clamp-2', align: 'center' },
          children: [{ tag: 'a', properties: { className: stretchedLinkClassName, href: '#' }, children: [label] }],
        },
        price,
      ],
    },
  ],
};

export const tileStoryProduct: Story<'p-tile'> = {
  previewMaxWidth: '816px',
  generator: () => [createComparison(tile, tailwindTile)],
};
