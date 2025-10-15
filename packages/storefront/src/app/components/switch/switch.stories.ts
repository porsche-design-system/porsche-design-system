'use client';

import type { Story } from '@/models/story';

export const switchStory: Story<'p-switch'> = {
  state: {
    properties: {
      checked: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-switch',
      properties: {
        ...properties,
      },
      events: {
        // @ts-expect-error
        onUpdate: {
          target: 'p-switch',
          prop: 'checked',
          eventValueKey: 'checked',
          eventType: 'SwitchUpdateEventDetail',
        },
      },
      children: ['Some label'],
    },
  ],
};
