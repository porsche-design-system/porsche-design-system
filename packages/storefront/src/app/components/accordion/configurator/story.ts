'use client';

import type { SlotStories, Story } from '@/models/story';

export const accordionSlotStories: SlotStories<'p-accordion'> = {
  'summary-before': {
    checkbox: {
      name: 'Checkbox',
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: {
            slot: 'summary-before',
            name: 'some-name',
            label: 'Some label',
            hideLabel: true,
          },
        },
      ],
    },
  },
  'summary-after': {
    popover: {
      name: 'Popover',
      generator: () => [
        {
          tag: 'p-popover',
          properties: {
            slot: 'summary-after',
          },
          children: ['Some content'],
        },
      ],
    },
    tags: {
      name: 'Tags',
      generator: () => [
        {
          tag: 'p-tag',
          properties: {
            slot: 'summary-after',
          },
          children: ['3'],
        },
        {
          tag: 'p-tag',
          properties: {
            slot: 'summary-after',
          },
          children: [
            {
              tag: 'button',
              properties: {
                type: 'button',
              },
              children: ['Reset'],
            },
          ],
        },
      ],
    },
  },
  summary: {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-heading',
          properties: {
            slot: 'summary',
            tag: 'h2',
            size: 'small',
            weight: 'semibold',
          },
          children: ['Some summary'],
        },
      ],
    },
  },
  default: {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-text',
          children: [
            'Some details. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore agna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
          ],
        },
      ],
    },
  },
};

export const accordionStory: Story<'p-accordion'> = {
  state: {
    properties: { open: false },
    slots: {
      summary: accordionSlotStories.summary.basic,
      default: accordionSlotStories.default.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-accordion',
      properties,
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
        ...(slots?.summary?.generator() ?? []),
        ...(slots?.['summary-before']?.generator() ?? []),
        ...(slots?.['summary-after']?.generator() ?? []),
        ...(slots?.default?.generator() ?? []),
      ],
    },
  ],
};
