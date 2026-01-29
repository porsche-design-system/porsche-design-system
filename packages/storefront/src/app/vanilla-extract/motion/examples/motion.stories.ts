'use client';

import type { Story } from '@/models/story';

export const motionVanillaExtractStoryDuration: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className: 'duration-short transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transitionDuration: `${durationSm}`'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'duration-moderate transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transitionDuration: `${durationMd}`'],
        },
        {
          tag: 'div',
          properties: {
            className: 'duration-long transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transitionDuration: `${durationLg}`'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'duration-very-long transition-transform transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transitionDuration: `${durationXl}`'],
        },
      ],
    },
  ],
};

export const motionVanillaExtractStoryEase: Story<'div'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'grid gap-fluid-md prose-text-sm',
      },
      children: [
        {
          tag: 'div',
          properties: {
            className:
              'ease-in-out transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transitionTimingFunction: `${motionEasingBase}`'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-in transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transitionTimingFunction: `${motionEasingIn}`'],
        },
        {
          tag: 'div',
          properties: {
            className:
              'ease-out transition-transform duration-very-long transform hover:scale-120 rounded-lg bg-surface p-fluid-sm',
          },
          children: ['transitionTimingFunction: `${motionEasingOut}`'],
        },
      ],
    },
  ],
};
