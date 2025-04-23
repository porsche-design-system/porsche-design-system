'use client';

import type { Story } from '@/models/story';

export const stepperHorizontalStory: Story<'p-stepper-horizontal'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-stepper-horizontal',
      properties,
      children: [
        { tag: 'p-stepper-horizontal-item', properties: { state: 'complete' }, children: ['Step 1'] },
        { tag: 'p-stepper-horizontal-item', properties: { state: 'warning' }, children: ['Step 2'] },
        { tag: 'p-stepper-horizontal-item', properties: { state: 'current' }, children: ['Step 3'] },
        { tag: 'p-stepper-horizontal-item', children: ['Step 4'] },
      ],
    },
  ],
};
