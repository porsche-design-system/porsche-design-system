import type { Story } from '@/models/story';

export const accordionStoryStickySummaryName = 'Sticky summary';

export const accordionStoryStickySummary: Story<'p-accordion'> = {
  state: {
    properties: {
      open: true,
      sticky: true,
      background: 'surface',
      className: '[--p-accordion-summary-top:40px]',
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
          tag: 'p-text',
          children: [
            'Some details. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.',
          ],
        },
      ],
    },
  ],
};
