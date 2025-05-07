'use client';

import type { Story } from '@/models/story';

export const focusStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'button',
      properties: {
        className: 'focus-visible:outline outline-state-focus outline-offset-2 rounded-sm',
        type: 'button',
      },
      children: ['.focus-visible:outline .outline-state-focus .outline-offset-2 .rounded-sm'],
    },
  ],
};

// <button class="focus-visible:outline outline-state-focus outline-offset-2 rounded-sm">
// .focus-visible:outline .outline-state-focus .outline-offset-2 .rounded-sm
// </button>
