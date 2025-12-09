'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const radioGroupOptions: ElementConfig<HTMLTagOrComponent>[] = [
  { tag: 'p-radio-group-option', properties: { value: 'a', label: 'Option A' } },
  {
    tag: 'p-radio-group-option',
    properties: { value: 'b' },
    children: [
      {
        tag: 'span',
        properties: { slot: 'label' },
        children: [
          'Option B with slotted label and ',
          {
            tag: 'a',
            properties: { href: 'https://www.porsche.com', className: 'underline' },
            children: ['link'],
          },
        ],
      },
    ],
  },
  {
    tag: 'p-radio-group-option',
    properties: { value: 'c' },
    children: [
      {
        tag: 'div',
        properties: { slot: 'label-start', className: 'w-[22px] h-[22px] bg-[deeppink] mr-static-sm rounded-full' },
      },
      {
        tag: 'span',
        properties: { slot: 'label' },
        children: ['Some slotted label with a "label-start" and "label-end" slot'],
      },
      {
        tag: 'p-popover',
        properties: { slot: 'label-end' },
        children: ['Option C with slotted label and a popover '],
      },
    ],
  },
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
  generator: ({ properties } = {}) => [
    {
      tag: 'p-radio-group',
      properties,
      children: radioGroupOptions,
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
            '.',
          ],
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
        ...radioGroupOptions,
      ],
    },
  ],
};
