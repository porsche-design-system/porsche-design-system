'use client';

import type { Story } from '@/models/story';

export const aiTagStoryWithSelect: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'p-select',
      properties: { name: 'options', description: 'Some description' },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label' },
          children: [
            'Pick your favorite Fruits',
            { tag: 'p-ai-tag', properties: { variant: 'abbreviation', className: 'ms-static-sm' } },
          ],
        },
        {
          tag: 'p-optgroup',
          properties: { label: 'Some optgroup label 1' },
          children: [
            {
              tag: 'p-select-option',
              properties: { value: 'a' },
              children: ['Option A'],
            },
            { tag: 'p-select-option', properties: { value: 'b' }, children: ['Option B'] },
            {
              tag: 'p-select-option',
              properties: { value: 'c' },
              children: ['Option C'],
            },
          ],
        },
        {
          tag: 'p-optgroup',
          properties: { label: 'Some optgroup label 2' },
          children: [
            { tag: 'p-select-option', properties: { value: 'd' }, children: ['Option D'] },
            {
              tag: 'p-select-option',
              properties: { value: 'e' },
              children: ['Option E'],
            },
            { tag: 'p-select-option', properties: { value: 'f' }, children: ['Option F'] },
          ],
        },
      ],
    },
  ],
};

