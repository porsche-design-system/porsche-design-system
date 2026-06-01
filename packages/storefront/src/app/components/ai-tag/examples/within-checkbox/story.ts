'use client';

import type { Story } from '@/models/story';

export const aiTagStoryWithCheckbox: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'p-fieldset',
      properties: { label: 'Pick your favorite Fruits', labelSize: 'small', className: 'flex flex-col gap-static-sm' },
      children: [
        {
          tag: 'p-text',
          properties: { className: '-mt-static-md mb-static-sm' },
          children: ['Slotted description with optional link'],
        },
        {
          tag: 'div',
          properties: { className: 'flex flex-col gap-static-sm' },
          children: [
            {
              tag: 'p-checkbox',
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
              tag: 'p-checkbox',
              properties: { label: 'Apple' },
            },
            {
              tag: 'p-checkbox',
              properties: { checked: true },
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
              tag: 'p-checkbox',
              properties: { label: 'Grapefruit' },
            },
          ],
        },
      ],
    },
  ],
};

