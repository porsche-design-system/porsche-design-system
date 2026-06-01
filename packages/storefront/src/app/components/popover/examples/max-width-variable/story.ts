'use client';

import type { Story } from '@/models/story';

export const popoverMaxWidthStory: Story<'p-popover'> = {
  generator: () => [
    {
      tag: 'p-popover',
      properties: {
        className: '[--p-popover-max-w:max-content]',
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
