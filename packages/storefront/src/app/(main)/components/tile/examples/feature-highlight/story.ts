'use client';

import type { ElementConfig, HTMLTagOrComponent, Story, StoryState } from '@porsche-design-system/story-generator';

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

export const tileStoryFeatureHighlight: Story<'p-tile'> = {
  previewMaxWidth: '560px',
  // the story state holds the `open` state of the accordion instead of properties of the tile
  state: { properties: { open: false } as StoryState<'p-tile'>['properties'] },
  generator: ({ properties } = {}) => [createTile(properties as FeatureHighlightState)],
};
