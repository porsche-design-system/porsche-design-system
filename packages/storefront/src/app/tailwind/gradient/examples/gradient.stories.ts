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
            className: 'pds-gradient-to-t rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.pds-gradient-to-t'],
        },
        {
          tag: 'div',
          properties: {
            className: 'pds-gradient-to-b rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.pds-gradient-to-b'],
        },
        {
          tag: 'div',
          properties: {
            className: 'pds-gradient-to-l rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.pds-gradient-to-l'],
        },
        {
          tag: 'div',
          properties: {
            className: 'pds-gradient-to-r rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.pds-gradient-to-r'],
        },
      ],
    },
  ],
};
