'use client';

import type { Story } from '@/models/story';

export const frostedGlassStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className:
          'flex p-fluid-md [background:radial-gradient(circle,_rgba(238,174,202,1)_0%,_rgba(148,187,233,1)_100%)]',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className:
              'backdrop-blur-(--frosted-glass) bg-background-frosted rounded-lg text-sm text-primary-dark p-fluid-md',
          },
          children: ['.backdrop-blur-(--frosted-glass)'],
        },
      ],
    },
  ],
};
