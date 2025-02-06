'use client';

import type { Story } from '@/models/story';
import type { AccordionUpdateEventDetail } from '@porsche-design-system/components-react/ssr';

export const accordionStory: Story<'p-accordion'> = {
  state: {
    properties: { open: false, heading: 'Some Heading' },
  },
  generator: ({ properties } = {}, updateState = () => {}) => [
    {
      tag: 'p-accordion',
      properties: {
        ...properties,
        onUpdate: (e: CustomEvent<AccordionUpdateEventDetail>) => updateState('p-accordion', 'open', e.detail.open),
      },
      children: [
        {
          tag: 'p-text',
          children: [
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore agna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
          ],
        },
      ],
    },
  ],
};
