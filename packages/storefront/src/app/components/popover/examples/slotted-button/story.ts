'use client';

import type { Story } from '@/models/story';

export const popoverSlottedButtonStory: Story<'p-popover'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: [
        {
          tag: 'p-button-pure',
          properties: { hideLabel: true, icon: 'car', slot: 'button' },
          children: ['More information'],
        },
        'Some additional content.',
      ],
    },
  ],
};

export const popoverMaxWidthStory: Story<'p-popover'> = {
  generator: () => [
    {
      tag: 'p-popover',
      properties: {
        className: '[--p-popover-max-width:max-content]',
      },
      children: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ipsum tellus, pretium in nunc ac, accumsan ultrices est. Sed ornare at lorem nec maximus.',
      ],
    },
    {
      tag: 'p-popover',
      children: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ipsum tellus, pretium in nunc ac, accumsan ultrices est. Sed ornare at lorem nec maximus.',
      ],
    },
  ],
};
