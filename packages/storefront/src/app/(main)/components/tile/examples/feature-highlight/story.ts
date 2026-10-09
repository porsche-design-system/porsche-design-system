'use client';

import { createComparison } from '@/app/(main)/components/tile/examples/comparison';
import type { Story, StoryState } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

type Children = (string | ElementConfig<HTMLTagOrComponent>)[];

const imageProperties = {
  src: 'assets/lights.jpg',
  alt: '',
};

type FeatureHighlightState = { open?: boolean };

const createContent = ({ open }: FeatureHighlightState): Children => [
  {
    tag: 'p-heading',
    properties: { tag: 'h3', size: 'lg' },
    children: ['Light design.', { tag: 'sup', children: ['1'] }],
  },
  {
    // `self-stretch` lets the details span the full width of the tile when expanded
    tag: 'p-accordion',
    properties: { className: 'self-stretch', alignMarker: 'start', compact: true, open },
    events: {
      // @ts-expect-error
      onUpdate: {
        target: 'p-accordion',
        prop: 'open',
        eventValueKey: 'open',
        eventType: 'AccordionUpdateEventDetail',
      },
    },
    children: [
      { tag: 'span', properties: { slot: 'summary' }, children: ['Show more'] },
      {
        tag: 'p-text',
        children: [
          'Distinctive light signatures at the front and rear make the vehicle recognisable at first glance, even in the dark.',
        ],
      },
      {
        tag: 'p-text',
        properties: { className: 'mt-static-sm', size: 'xs', color: 'contrast-medium' },
        children: [{ tag: 'sup', children: ['1'] }, 'Optionally available.'],
      },
    ],
  },
];

const createTile = (state: FeatureHighlightState): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'p-tile',
  properties: {
    className: 'scheme-dark',
    aspectRatio: '4/3',
    gradient: 'bottom',
  },
  children: [
    { tag: 'img', properties: { slot: 'background', ...imageProperties } },
    {
      tag: 'div',
      properties: { slot: 'bottom', className: 'flex flex-col items-start gap-static-md' },
      children: createContent(state),
    },
  ],
});

const createTailwindTile = (state: FeatureHighlightState): ElementConfig<HTMLTagOrComponent> => ({
  // without stretched link, the tile itself can clip the image to the radius
  tag: 'div',
  properties: {
    className:
      'scheme-dark relative isolate grid grid-rows-[1fr_auto] aspect-[4/3] overflow-clip rounded-3xl bg-canvas text-primary',
  },
  children: [
    {
      tag: 'img',
      properties: { className: 'absolute inset-0 -z-1 size-full object-cover', ...imageProperties },
    },
    {
      // the gradient extends above the content via the top padding to ensure the legibility of the heading
      tag: 'div',
      properties: {
        className: 'row-start-2 flex flex-col items-start gap-static-md p-fluid-md pt-fluid-lg bg-fade-to-t',
      },
      children: createContent(state),
    },
  ],
});

export const tileStoryFeatureHighlight: Story<'p-tile'> = {
  previewMaxWidth: '1136px',
  // the story state holds the `open` state shared by both accordions instead of properties of the tile
  state: { properties: { open: false } as StoryState<'p-tile'>['properties'] },
  generator: ({ properties } = {}) => {
    const state = properties as FeatureHighlightState;
    return [createComparison(createTile(state), createTailwindTile(state))];
  },
};
