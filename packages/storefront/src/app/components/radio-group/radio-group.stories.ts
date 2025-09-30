'use client';

import type { SlotStories, Story } from '@/models/story';
import { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

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
      properties: { state: 'error' },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label', id: 'some-label-id' },
          children: [
            'Some label with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'description', id: 'some-description-id' },
          children: [
            'Some description with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'span',
          properties: { slot: 'message', id: 'some-message-id' },
          children: [
            'Some error message with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        ...radioGroupOptions,
      ],
    },
  ],
};
