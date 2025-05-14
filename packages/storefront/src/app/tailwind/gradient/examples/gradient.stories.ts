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
            className: 'bg-fade-to-t rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.bg-fade-to-t'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-b rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.bg-fade-to-b'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-l rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.bg-fade-to-l'],
        },
        {
          tag: 'div',
          properties: {
            className: 'bg-fade-to-r rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.bg-fade-to-r'],
        },
      ],
    },
  ],
};
