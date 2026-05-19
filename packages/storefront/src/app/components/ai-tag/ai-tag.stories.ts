'use client';

import type { Story } from '@/models/story';

export const aiTagStory: Story<'p-ai-tag'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-ai-tag',
      properties,
      children: [],
    },
  ],
};

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

export const aiTagStoryWithInputSearch: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'p-input-search',
      properties: { label: "What's your favorite Fruit", description: 'Search for fruits', name: 'search' },
      children: [
        {
          tag: 'p-ai-tag',
          properties: {
            slot: 'end',
            variant: 'abbreviation',
          },
        },
      ],
    },
  ],
};

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

export const aiTagStoryWithImage: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'relative inline-block rounded-lg overflow-hidden' },
      children: [
        {
          tag: 'img',
          properties: {
            src: 'assets/ai-tag-image.jpg',
            alt: 'AI modified image',
            className: 'block w-[300px] h-[300px] object-cover',
          },
        },
        {
          tag: 'p-ai-tag',
          properties: {
            variant: 'modified',
            className: 'absolute bottom-static-sm end-static-sm scheme-dark',
          },
        },
      ],
    },
  ],
};

export const aiTagStoryWithText: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'p-text',
      children: [
        "This content was generated using artificial intelligence (AI). AI can be a powerful tool for creating content, but it's important to be transparent about its use. By including an AI tag, we can inform users that this content may have been modified or generated by AI, helping to build trust and provide context for the information presented.",
        { tag: 'p-ai-tag', properties: { variant: 'modified', className: 'align-bottom' } },
        ' This is some additional text to show how the AI tag can be used within a text component. The AI tag can be used to indicate that certain content has been modified or generated by AI, providing transparency to users.',
      ],
    },
  ],
};

export const aiTagStoryWithTable: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'w-full' },
      children: [
        {
          tag: 'p-table',
          children: [
            {
              tag: 'p-heading',
              properties: { slot: 'caption', size: 'large', tag: 'h3' },
              children: ['Some slotted caption'],
            },
            {
              tag: 'p-table-head',
              children: [
                {
                  tag: 'p-table-head-row',
                  children: [
                    {
                      tag: 'p-table-head-cell',
                      properties: { sort: { id: 'model', active: true, direction: 'desc' } },
                      children: ['Model'],
                    },
                    { tag: 'p-table-head-cell', children: ['Date'] },
                    { tag: 'p-table-head-cell', children: ['Purchase Intention'] },
                    {
                      tag: 'p-table-head-cell',
                      children: [
                        {
                          tag: 'span',
                          properties: { className: 'inline-flex items-center gap-static-sm' },
                          children: ['Status', { tag: 'p-ai-tag', properties: { variant: 'abbreviation' } }],
                        },
                      ],
                    },
                    { tag: 'p-table-head-cell', children: ['Lead ID'] },
                  ],
                },
              ],
            },
            {
              tag: 'p-table-body',
              children: [
                {
                  tag: 'p-table-row',
                  children: [
                    { tag: 'p-table-cell', children: ['718 Cayman'] },
                    { tag: 'p-table-cell', children: ['23.06.2021'] },
                    { tag: 'p-table-cell', children: ['New Car'] },
                    { tag: 'p-table-cell', children: ['Won'] },
                    { tag: 'p-table-cell', children: ['0000824402'] },
                  ],
                },
                {
                  tag: 'p-table-row',
                  children: [
                    { tag: 'p-table-cell', children: ['Panamera 4S'] },
                    { tag: 'p-table-cell', children: ['15.03.2023'] },
                    { tag: 'p-table-cell', children: ['Used Car'] },
                    { tag: 'p-table-cell', children: ['Lost'] },
                    { tag: 'p-table-cell', children: ['0000824408'] },
                  ],
                },
                {
                  tag: 'p-table-row',
                  children: [
                    { tag: 'p-table-cell', children: ['911 Carrera S'] },
                    { tag: 'p-table-cell', children: ['28.08.2025'] },
                    { tag: 'p-table-cell', children: ['New Car'] },
                    { tag: 'p-table-cell', children: ['Won'] },
                    { tag: 'p-table-cell', children: ['0000824409'] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
