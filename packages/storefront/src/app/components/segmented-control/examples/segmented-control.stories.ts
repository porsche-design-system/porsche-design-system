'use client';

import type { Story } from '@/models/story';

export const segmentedControlStory: Story<'p-segmented-control'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-segmented-control',
      properties,
      children: [
        { tag: 'p-segmented-control-item', properties: { value: '1' }, children: ['Option 1'] },
        { tag: 'p-segmented-control-item', properties: { value: '2' }, children: ['Option 2'] },
        { tag: 'p-segmented-control-item', properties: { value: '3' }, children: ['Option 3'] },
        { tag: 'p-segmented-control-item', properties: { value: '4' }, children: ['Option 4'] },
        { tag: 'p-segmented-control-item', properties: { value: '5' }, children: ['Option 5'] },
      ],
    },
  ],
};
