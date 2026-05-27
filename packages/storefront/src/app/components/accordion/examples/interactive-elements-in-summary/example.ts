import type { Story } from '@/models/story';

export const accordionStoryInteractiveSummaryName = 'Interactive elements in summary';

export const accordionStoryInteractiveSummary: Story<'p-accordion'> = {
  state: {
    properties: {
      open: true,
      background: 'surface',
    },
  },
  generator: ({ properties } = {}) => [
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
        {
          tag: 'p-heading',
          properties: {
            slot: 'summary',
            tag: 'h3',
            size: 'small',
            weight: 'semibold',
          },
          children: ['Some summary'],
        },
        {
          tag: 'p-checkbox',
          properties: {
            slot: 'summary-before',
            name: 'some-name',
            label: 'Some label',
            hideLabel: true,
          },
        },
        {
          tag: 'p-popover',
          properties: {
            slot: 'summary-after',
          },
          children: ['Some content'],
        },
        {
          tag: 'p-text',
          children: [
            'Some details. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
          ],
        },
      ],
    },
  ],
};
