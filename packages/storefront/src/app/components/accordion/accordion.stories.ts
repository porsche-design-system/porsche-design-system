'use client';

import type { SlotStories, Story } from '@/models/story';
import type { CSSProperties } from 'react';

export const accordionSlotStories: SlotStories<'p-accordion'> = {
  default: {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-text',
          children: [
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore agna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
          ],
        },
      ],
    },
    'slotted-heading': {
      name: 'Slotted heading',
      generator: ({ properties } = {}) => [
        {
          tag: 'span',
          properties: {
            slot: 'heading',
            style: { padding: '1rem' },
          },
          children: [properties?.heading ?? 'Some slotted heading'],
        },
        {
          tag: 'p-text',
          children: [
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore agna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
          ],
        },
      ],
    },
  },
};

export const accordionStory: Story<'p-accordion'> = {
  state: {
    properties: { open: false, heading: 'Some Heading' },
    slots: {
      default: accordionSlotStories.default.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-accordion',
      properties: Object.fromEntries(
        Object.entries(properties ?? {}).filter(([name]) =>
          slots?.default.name === 'Slotted heading' ? name !== 'heading' : true
        )
      ),
      events: {
        // @ts-ignore
        onUpdate: {
          target: 'p-accordion',
          prop: 'open',
          eventValueKey: 'open',
          eventType: 'AccordionUpdateEventDetail',
        },
      },
      children:
        slots?.default?.generator(
          slots?.default.name === 'Slotted heading' ? { properties: { heading: properties?.heading } } : undefined
        ) ?? [],
    },
  ],
};

export const accordionStoryExpandedClickArea: Story<'p-accordion'> = {
  state: {
    properties: { open: false },
    slots: {
      default: accordionSlotStories.default['slotted-heading'],
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-accordion',
      properties,
      events: {
        // @ts-ignore
        onUpdate: {
          target: 'p-accordion',
          prop: 'open',
          eventValueKey: 'open',
          eventType: 'AccordionUpdateEventDetail',
        },
      },
      children: [...(slots?.default.generator() ?? [])],
    },
  ],
};

export const accordionStoryStickyHeadline: Story<'p-accordion'> = {
  state: {
    properties: {
      open: true,
      heading: 'Some Heading',
      sticky: true,
      style: { '--p-accordion-position-sticky-top': '56px' } as CSSProperties,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-accordion',
      properties,
      events: {
        // @ts-ignore
        onUpdate: {
          target: 'p-accordion',
          prop: 'open',
          eventValueKey: 'open',
          eventType: 'AccordionUpdateEventDetail',
        },
      },
      children: [
        {
          tag: 'p-text',
          children: [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
          ],
        },
      ],
    },
  ],
};
