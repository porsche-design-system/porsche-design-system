'use client';

import type { Story } from '@/models/story';

export const focusScssStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'flex flex-wrap justify-center items-start gap-fluid-md p-fluid-md bg-canvas',
      },
      children: [
        {
          tag: 'h3',
          properties: {
            className: 'prose-heading-md text-center w-full',
          },
          children: ['@include pds-focus;'],
        },
        {
          tag: 'button',
          properties: {
            className:
              'prose-text-sm focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-focus)] rounded-sm focus:not-focus-visible:outline-transparent',
          },
          children: ['Some Button'],
        },
        {
          tag: 'a',
          properties: {
            href: '#',
            className:
              'prose-text-sm focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-focus)] rounded-sm focus:not-focus-visible:outline-transparent',
          },
          children: ['Some Anchor'],
        },
        {
          tag: 'p',
          properties: {
            className: 'prose-text-sm max-w-[15rem]',
          },
          children: [
            'Lorem Ipsum ',
            {
              tag: 'a',
              properties: {
                href: '#',
                className:
                  'prose-text-sm focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-focus)] rounded-sm focus:not-focus-visible:outline-transparent',
              },
              children: ['is simply dummy text of the printing'],
            },
            ' and typesetting industry.',
          ],
        },
      ],
    },
  ],
};
