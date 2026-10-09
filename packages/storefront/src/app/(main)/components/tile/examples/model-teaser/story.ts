'use client';

import { createComparison, stretchedLinkClassName } from '@/app/(main)/components/tile/examples/comparison';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

type Children = (string | ElementConfig<HTMLTagOrComponent>)[];

const label = 'Discover 911';
const heading = 'The iconic sports car with rear engine';

const createContent = ({
  imageClassName,
  heading: headingElement,
  actionClassName,
}: {
  imageClassName: string;
  heading: ElementConfig<HTMLTagOrComponent>;
  actionClassName: string;
}): Children => [
  {
    // signature and vehicle are stacked in the same grid cell, the margin lets the vehicle overlap the signature; the
    // mask of the signature paints it above non-positioned content, so `z-1` places the vehicle in front of it
    tag: 'div',
    properties: { className: 'grid grid-cols-1 w-full max-w-[560px]' },
    children: [
      {
        tag: 'p-model-signature',
        properties: {
          className:
            '[grid-area:1/1] justify-self-center [--p-model-signature-width:75%] [--p-model-signature-color:var(--color-canvas)]',
          model: '911',
          safeZone: false,
        },
      },
      {
        tag: 'img',
        properties: {
          className: `[grid-area:1/1] z-1 w-full mt-[6%] motion-safe:transition-transform duration-md ease-in-out ${imageClassName}`,
          src: 'assets/model-series/911.webp',
          alt: '',
          width: 776,
          height: 276,
        },
      },
    ],
  },
  headingElement,
  {
    tag: 'p-text',
    properties: { size: 'xs', color: 'contrast-medium', align: 'center' },
    children: ['From €123,456.00* or €1,234.00/month*'],
  },
  {
    tag: 'div',
    properties: { className: 'flex flex-wrap justify-center items-center gap-static-md mt-fluid-sm' },
    children: [
      {
        // visual duplicate of the main link, hidden from assistive technology and keyboard to avoid a redundant link
        tag: 'p-link',
        properties: { className: actionClassName, variant: 'secondary', 'aria-hidden': 'true' },
        children: [{ tag: 'a', properties: { href: '#', tabIndex: -1 }, children: [label] }],
      },
      {
        // independent action; the accessible name contains the visible label and identifies the model
        tag: 'p-link-pure',
        properties: { className: actionClassName, href: '#', aria: { 'aria-label': 'Configure 911' } },
        children: ['Configure'],
      },
    ],
  },
];

const tile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'p-tile',
  properties: { className: 'group', aspectRatio: '4/3' },
  children: [
    { tag: 'a', properties: { slot: 'anchor', href: '#' }, children: [label] },
    ...createContent({
      imageClassName: 'group-has-[[slot=anchor]:hover,p-link[aria-hidden]:hover]:scale-105',
      heading: {
        tag: 'p-heading',
        properties: { tag: 'h3', size: 'sm', align: 'center' },
        children: [heading],
      },
      // `pointer-events-auto` opts out of the click-through tile content, so the links show their own hover state
      actionClassName: 'pointer-events-auto',
    }),
  ],
};

const tailwindTile: ElementConfig<HTMLTagOrComponent> = {
  tag: 'article',
  properties: {
    className:
      'group relative isolate flex flex-col justify-center items-center gap-fluid-sm p-fluid-md aspect-[4/3] rounded-3xl bg-surface text-primary text-center',
  },
  children: createContent({
    imageClassName: 'group-has-[a:hover]:scale-105',
    heading: {
      tag: 'p-heading',
      properties: { tag: 'h3', size: 'sm', align: 'center' },
      children: [{ tag: 'a', properties: { className: stretchedLinkClassName, href: '#' }, children: [heading] }],
    },
    // `relative z-2` places the links above the stretched link, so they show their own hover state
    actionClassName: 'relative z-2',
  }),
};

export const tileStoryModelTeaser: Story<'p-tile'> = {
  generator: () => [createComparison(tile, tailwindTile)],
};
