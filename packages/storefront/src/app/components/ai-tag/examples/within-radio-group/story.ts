'use client';

import type { Story } from '@/models/story';

export const aiTagStoryWithRadioButton: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'p-heading',
      properties: { size: 'small', tag: 'h3' },
      children: ['Pick your favorite Fruits'],
    },
    {
      tag: 'p-radio-group',
      properties: { label: 'Some Label', name: 'fruit', value: 'banana', className: 'mt-static-sm' },
      children: [
        {
          tag: 'p-radio-group-option',
          properties: { value: 'banana' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                'Banana',
                { tag: 'p-ai-tag', properties: { variant: 'generated', className: 'ms-static-sm' } },
              ],
            },
          ],
        },
        {
          tag: 'p-radio-group-option',
          properties: { value: 'apple', label: 'Apple' },
        },
        {
          tag: 'p-radio-group-option',
          properties: { value: 'melon' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                'Melon',
                { tag: 'p-ai-tag', properties: { variant: 'abbreviation', className: 'ms-static-sm' } },
              ],
            },
          ],
        },
        {
          tag: 'p-radio-group-option',
          properties: { value: 'grapefruit', label: 'Grapefruit' },
        },
      ],
    },
  ],
};

