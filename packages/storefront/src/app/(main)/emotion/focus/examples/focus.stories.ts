'use client';

import type { Story } from '@/models/story';

export const focusEmotionStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid items-center',
      },
      children: [
        {
          tag: 'button',
          properties: {
            type: 'button',
            className: 'focus-visible:outline outline-focus outline-offset-2 rounded-xl p-static-sm bg-frosted',
          },
          children: ['...getFocusVisibleStyle()'],
        },
      ],
    },
  ],
};
