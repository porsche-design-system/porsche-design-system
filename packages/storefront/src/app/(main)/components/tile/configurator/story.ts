'use client';

import type { SlotStories, Story, StoryState } from '@/models/story';

const anchorHref = 'https://porsche.com';
const anchorLabel = 'Some label';

const hasAnchor = (state?: StoryState<'p-tile'>): boolean => !!state?.slots?.anchor;

// while an anchor is slotted, all other content is click-through, so independent interactive elements have to opt in
const getPointerEventsStyle = (state?: StoryState<'p-tile'>) =>
  hasAnchor(state) ? { style: { pointerEvents: 'auto' as const } } : {};

const createTextSlotStory = (slot?: string): Story<'p-tile'> => ({
  name: 'Text',
  generator: () => [
    {
      tag: 'p-text',
      properties: slot ? { slot } : {},
      children: [`Some ${slot ?? 'default'} content`],
    },
  ],
});

// TODO: add more slot examples (e.g. heading, tag, icon, button, nested tile)
export const tileSlotStories: SlotStories<'p-tile'> = {
  default: { text: createTextSlotStory() },
  top: { text: createTextSlotStory('top') },
  bottom: {
    text: createTextSlotStory('bottom'),
    link: {
      name: 'Link',
      generator: (state) => [
        {
          tag: 'p-link',
          properties: {
            slot: 'bottom',
            href: 'https://porsche.com/international/models',
            ...getPointerEventsStyle(state),
          },
          children: ['Some link'],
        },
      ],
    },
    twoLinks: {
      name: 'Two links',
      generator: (state) => [
        {
          tag: 'p-link',
          properties: {
            slot: 'bottom',
            href: anchorHref,
            // duplicates the anchor, so it is hidden from assistive technology and keyboard and stays click-through
            ...(hasAnchor(state) && { 'aria-hidden': 'true', tabIndex: -1 }),
          },
          children: [anchorLabel],
        },
        {
          tag: 'p-link',
          properties: {
            slot: 'bottom',
            href: 'https://porsche.com/international/models',
            variant: 'secondary',
            ...getPointerEventsStyle(state),
          },
          children: ['Some secondary link'],
        },
      ],
    },
  },
  start: { text: createTextSlotStory('start') },
  end: { text: createTextSlotStory('end') },
  background: {
    image: {
      name: 'Image',
      generator: () => [{ tag: 'img', properties: { slot: 'background', src: 'assets/lights.jpg', alt: '' } }],
    },
    picture: {
      name: 'Picture',
      generator: () => [
        {
          tag: 'picture',
          properties: { slot: 'background' },
          children: [
            { tag: 'source', properties: { media: '(min-width: 1000px)', srcSet: 'assets/lights.jpg' } },
            { tag: 'img', properties: { src: 'assets/ocean.jpg', alt: '' } },
          ],
        },
      ],
    },
    video: {
      name: 'Video',
      generator: () => [
        {
          tag: 'video',
          properties: {
            slot: 'background',
            src: 'assets/ocean.mp4',
            poster: 'assets/ocean.jpg',
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true,
            'aria-hidden': 'true',
          },
        },
      ],
    },
  },
  anchor: {
    link: {
      name: 'Link',
      generator: () => [{ tag: 'a', properties: { slot: 'anchor', href: anchorHref }, children: [anchorLabel] }],
    },
  },
};

export const tileStory: Story<'p-tile'> = {
  state: {
    slots: {
      default: tileSlotStories.default.text,
    },
  },
  generator: (state = {}) => [
    {
      tag: 'p-tile',
      properties: state.properties,
      children: (['background', 'anchor', 'top', 'start', 'default', 'end', 'bottom'] as const).flatMap(
        (slot) => state.slots?.[slot]?.generator(state) ?? []
      ),
    },
  ],
};
