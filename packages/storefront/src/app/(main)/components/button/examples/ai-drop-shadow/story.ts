'use client';

import type { Story } from '@/models/story';

const style = `.custom-ai-shadow {
  --p-button-bg: #fff;
  --p-button-fg: #000;
  box-shadow: var(--p-shadow-lg);
}

.custom-ai-shadow:not(:disabled, :state(loading)):hover {
  --p-button-bg: var(--p-color-frosted-strong);
  --p-button-fg: var(--p-color-primary);
}`;

export const buttonStoryAiDropShadow: Story<'p-button'> = {
  generator: () => [
    {
      tag: 'style',
      children: [style],
    },
    {
      tag: 'div',
      properties: {
        className: 'flex flex-wrap gap-static-lg items-start',
      },
      children: [
        {
          tag: 'p-button',
          properties: {
            className: 'custom-ai-shadow',
            icon: 'ai-chat',
            hideLabel: true,
          },
          children: ['Ask AI assistant'],
        },
        {
          tag: 'p-button',
          properties: {
            className: 'custom-ai-shadow',
            icon: 'ai-chat',
          },
          children: ['Ask AI assistant'],
        },
      ],
    },
  ],
};
