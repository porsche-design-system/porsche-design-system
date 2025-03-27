'use client';

import type { Story } from '@/models/story';

export const textFieldWrapperStory: Story<'p-text-field-wrapper'> = {
  state: { properties: { label: 'Some label' } },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-text-field-wrapper',
      properties,
      children: [{ tag: 'input', properties: { type: 'text', name: 'some-name' } }],
    },
  ],
};

export const textFieldWrapperStoryCounter: Story<'p-text-field-wrapper'> = {
  generator: () => [
    {
      tag: 'p-text-field-wrapper',
      properties: { label: 'Some label' },
      children: [{ tag: 'input', properties: { type: 'text', name: 'some-name', value: 'Some value', maxLength: 20 } }],
    },
    {
      tag: 'p-text-field-wrapper',
      properties: { label: 'Some label', showCounter: false },
      children: [{ tag: 'input', properties: { type: 'text', name: 'some-name', value: 'Some value', maxLength: 20 } }],
    },
  ],
};

export const textFieldWrapperStoryTypeNumber: Story<'p-text-field-wrapper'> = {
  generator: () => [
    {
      tag: 'p-text-field-wrapper',
      properties: { label: 'Some label', description: 'The price in Euro', unit: 'EUR', unitPosition: 'prefix' },
      children: [{ tag: 'input', properties: { type: 'number', name: 'some-name', value: '500' } }],
    },
  ],
};

export const textFieldWrapperStoryTypePassword: Story<'p-text-field-wrapper'> = {
  generator: () => [
    {
      tag: 'p-text-field-wrapper',
      properties: { label: 'Some label' },
      children: [{ tag: 'input', properties: { type: 'password', name: 'some-name', value: 'some password' } }],
    },
  ],
};

export const textFieldWrapperStoryTypePasswordWithoutToggle: Story<'p-text-field-wrapper'> = {
  generator: () => [
    {
      tag: 'p-text-field-wrapper',
      properties: { label: 'Some label', showPasswordToggle: false },
      children: [{ tag: 'input', properties: { type: 'password', name: 'some-name', value: 'some password' } }],
    },
  ],
};

export const textFieldWrapperStorySearch: Story<'p-text-field-wrapper'> = {
  generator: () => [
    {
      tag: 'p-text-field-wrapper',
      properties: { label: 'Some label' },
      children: [{ tag: 'input', properties: { type: 'search', name: 'some-name' } }],
    },
    {
      tag: 'form',
      children: [
        {
          tag: 'p-text-field-wrapper',
          properties: { label: 'Some label', submitButton: true },
          children: [{ tag: 'input', properties: { type: 'search', name: 'some-name' } }],
        },
      ],
    },
  ],
};

export const textFieldWrapperStorySearchLocateAction: Story<'p-text-field-wrapper'> = {
  generator: () => [
    {
      tag: 'p-text-field-wrapper',
      properties: { label: 'Some label', actionIcon: 'locate' },
      children: [{ tag: 'input', properties: { type: 'search', name: 'some-name' } }],
    },
    {
      tag: 'form',
      children: [
        {
          tag: 'p-text-field-wrapper',
          properties: { label: 'Some label', actionIcon: 'locate' },
          children: [{ tag: 'input', properties: { type: 'search', name: 'some-name' } }],
        },
      ],
    },
  ],
};

export const textFieldWrapperStorySearchLocateActionLoading: Story<'p-text-field-wrapper'> = {
  generator: () => [
    {
      tag: 'p-text-field-wrapper',
      properties: { label: 'Some label', actionIcon: 'locate', actionLoading: true },
      children: [{ tag: 'input', properties: { type: 'search', name: 'some-name' } }],
    },
    {
      tag: 'form',
      children: [
        {
          tag: 'p-text-field-wrapper',
          properties: { label: 'Some label', actionIcon: 'locate', actionLoading: true },
          children: [{ tag: 'input', properties: { type: 'search', name: 'some-name' } }],
        },
      ],
    },
  ],
};

export const textFieldWrapperStorySlots: Story<'p-text-field-wrapper'> = {
  generator: () => [
    {
      tag: 'p-text-field-wrapper',
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
          tag: 'input',
          properties: {
            type: 'text',
            name: 'some-name',
            'aria-labelledby': 'some-label-id',
            'aria-describedby': 'some-description-id some-message-id',
          },
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
      ],
    },
  ],
};
