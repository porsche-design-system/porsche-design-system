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
                  properties: { slot: 'label', className: 'inline-flex items-center gap-static-sm' },
                  children: ['Banana ', { tag: 'p-ai-tag', properties: { textVariant: 'ai-generated' } }],
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
                  properties: { slot: 'label', className: 'inline-flex items-center gap-static-sm' },
                  children: ['Melon ', { tag: 'p-ai-tag', properties: { textVariant: 'abbreviation' } }],
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
              properties: { slot: 'label', className: 'inline-flex items-center gap-static-sm' },
              children: ['Banana', { tag: 'p-ai-tag', properties: { textVariant: 'ai-generated' } }],
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
              properties: { slot: 'label', className: 'inline-flex items-center gap-static-sm' },
              children: ['Melon', { tag: 'p-ai-tag', properties: { textVariant: 'abbreviation' } }],
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
            textVariant: 'abbreviation',
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
          properties: { slot: 'label', className: 'inline-flex items-center gap-static-sm' },
          children: ['Pick your favorite Fruits ', { tag: 'p-ai-tag', properties: { textVariant: 'abbreviation' } }],
        },
        {
          tag: 'p-optgroup',
          properties: { label: 'Some optgroup label 1' },
          children: [
            {
              tag: 'p-select-option',
              properties: { value: 'a' },
              children: ['Option A ', { tag: 'p-ai-tag', properties: { textVariant: 'ai-generated' } }],
            },
            { tag: 'p-select-option', properties: { value: 'b' }, children: ['Option B'] },
            {
              tag: 'p-select-option',
              properties: { value: 'c' },
              children: ['Option C ', { tag: 'p-ai-tag', properties: { textVariant: 'abbreviation' } }],
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
              children: ['Option E ', { tag: 'p-ai-tag', properties: { textVariant: 'ai-generated' } }],
            },
            { tag: 'p-select-option', properties: { value: 'f' }, children: ['Option F'] },
          ],
        },
      ],
    },
  ],
};

export const aiTagStoryWithTag: Story<'p-ai-tag'> = {
  generator: () => [
    {
      tag: 'div',
      properties: { className: 'flex flex-col items-start gap-static-md' },
      children: [
        {
          tag: 'p-tag',
          properties: { icon: 'globe' },
          children: [
            'Some label ',
            { tag: 'p-ai-tag', properties: { textVariant: 'abbreviation', className: 'ms-static-xs -me-[5px]' } },
          ],
        },
        {
          tag: 'p-tag',
          properties: { icon: 'globe' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button' },
              children: ['Some label'],
            },
            ' ',
            { tag: 'p-ai-tag', properties: { textVariant: 'abbreviation', className: 'ms-static-xs -me-[5px]' } },
          ],
        },
        {
          tag: 'p-tag',
          properties: { icon: 'globe', compact: true },
          children: [
            'Some label ',
            { tag: 'p-ai-tag', properties: { textVariant: 'abbreviation', className: 'ms-static-xs -me-[5px]' } },
          ],
        },
        {
          tag: 'p-tag',
          properties: { icon: 'globe', variant: 'primary' },
          children: [
            'Some label ',
            {
              tag: 'p-ai-tag',
              properties: { theme: 'dark', textVariant: 'abbreviation', className: 'ms-static-xs -me-[5px]' },
            },
          ],
        },
        {
          tag: 'p-tag',
          properties: { icon: 'globe', variant: 'primary' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button' },
              children: ['Some label'],
            },
            ' ',
            {
              tag: 'p-ai-tag',
              properties: { theme: 'dark', textVariant: 'abbreviation', className: 'ms-static-xs -me-[5px]' },
            },
          ],
        },
        {
          tag: 'p-tag',
          properties: { icon: 'globe', variant: 'primary', compact: true },
          children: [
            'Some label ',
            {
              tag: 'p-ai-tag',
              properties: { theme: 'dark', textVariant: 'abbreviation', className: 'ms-static-xs -me-[5px]' },
            },
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
            src: '/assets/ai-tag-image.jpg',
            alt: 'AI modified image',
            className: 'block w-[300px] h-[300px] object-cover',
          },
        },
        {
          tag: 'p-ai-tag',
          properties: {
            theme: 'dark',
            textVariant: 'ai-modified',
            className: 'absolute bottom-static-sm end-static-sm',
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
        { tag: 'p-ai-tag', properties: { textVariant: 'ai-modified', className: 'align-bottom' } },
        ' This is some additional text to show how the AI tag can be used within a text component. The AI tag can be used to indicate that certain content has been modified or generated by AI, providing transparency to users.',
      ],
    },
  ],
};
