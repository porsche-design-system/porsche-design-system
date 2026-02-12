'use client';

import type { Story, SlotStories } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const radioGroupSlotStories: SlotStories<'p-radio-group'> = {
  'label-after': {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-popover',
          properties: { slot: 'label-after', className: 'ms-static-xs' },
          children: ['Some Popover Content.'],
        },
      ],
    },
  },
};

const radioGroupOptions: ElementConfig<HTMLTagOrComponent>[] = [
  { tag: 'p-radio-group-option', properties: { value: 'a', label: 'Option A' } },
  { tag: 'p-radio-group-option', properties: { value: 'b', label: 'Option B' } },
  { tag: 'p-radio-group-option', properties: { value: 'c', label: 'Option C' } },
  { tag: 'p-radio-group-option', properties: { value: 'd', label: 'Option D' } },
  { tag: 'p-radio-group-option', properties: { value: 'e', label: 'Option E' } },
  { tag: 'p-radio-group-option', properties: { value: 'f', label: 'Option F' } },
];

export const radioGroupStory: Story<'p-radio-group'> = {
  state: {
    properties: {
      name: 'options',
      label: 'Some Label',
      description: 'Some description',
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-radio-group',
      properties,
      children: [
        ...(slots?.['label-after']?.generator() ?? []),
        ...radioGroupOptions,
      ],
    },
  ],
};

export const radioGroupStorySlots: Story<'p-radio-group'> = {
  generator: () => [
    {
      tag: 'p-radio-group',
      properties: { state: 'error', value: 'a' },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label' },
          children: [
            'Some label with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            ' text and a "label-after" slot.',
          ],
        },
        {
          tag: 'p-popover',
          properties: { slot: 'label-after', className: 'ms-static-xs' },
          children: ['Some Popover description'],
        },
        {
          tag: 'span',
          properties: { slot: 'description' },
          children: [
            'Some description with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'message' },
          children: [
            'Some error message with a ',
            {
              tag: 'a',
              properties: { href: 'https://designsystem.porsche.com', className: 'underline' },
              children: ['link'],
            },
            '.',
          ],
        },
        {
          tag: 'p-radio-group-option',
          properties: { value: 'a' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                {
                  tag: 'img',
                  properties: {
                    src: 'assets/911.png',
                    alt: '',
                    className: 'object-contain inline-block align-middle -mt-2 me-static-sm w-[70px]',
                  },
                },
                'Some slotted label with custom content and a "label-after" slot',
              ],
            },
            {
              tag: 'p-popover',
              properties: { slot: 'label-after', className: 'ms-static-xs' },
              children: ['Option A with slotted label and a popover '],
            },
          ],
        },
        {
          tag: 'p-radio-group-option',
          properties: { value: 'b' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: ['Option B with slotted label'],
            },
          ],
        },
        {
          tag: 'p-radio-group-option',
          properties: { value: 'c' },
          children: [
            {
              tag: 'span',
              properties: { slot: 'label' },
              children: [
                'Option C with slotted label and a nested ',
                {
                  tag: 'a',
                  properties: { href: 'https://www.porsche.com', className: 'underline' },
                  children: ['link'],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
