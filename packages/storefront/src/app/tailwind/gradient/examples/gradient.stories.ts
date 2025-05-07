'use client';

import type { Story } from '@/models/story';

export const gradientStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className:
          'flex flex-wrap gap-fluid-md justify-center p-fluid-md [background:radial-gradient(circle,_rgba(238,174,202,1)_0%,_rgba(148,187,233,1)_100%)]',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'bg-linear-(--gradient-to-top) rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.bg-linear-(--gradient-to-top)'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-linear-(--gradient-to-bottom) rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.bg-linear-(--gradient-to-bottom)'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-linear-(--gradient-to-left) rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.bg-linear-(--gradient-to-left)'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-linear-(--gradient-to-right) rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.bg-linear-(--gradient-to-right)'],
        },
      ],
    },
  ],
};
