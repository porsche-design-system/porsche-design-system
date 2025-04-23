'use client';

import type { Story } from '@/models/story';

export const radioButtonWrapperStory: Story<'p-radio-button-wrapper'> = {
  state: {
    properties: {
      label: 'Some label',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-radio-button-wrapper',
      properties,
      children: [{ tag: 'input', properties: { type: 'radio', name: 'some-name' } }],
    },
    {
      tag: 'p-radio-button-wrapper',
      properties: {
        label: 'Some label',
        style: { marginTop: '16px' },
      },
      children: [{ tag: 'input', properties: { type: 'radio', name: 'some-name' } }],
    },
  ],
};

export const radioButtonWrapperStoryLoading: Story<'p-radio-button-wrapper'> = {
  state: {
    properties: {
      label: 'Some label',
      loading: true,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-radio-button-wrapper',
      properties,
      children: [{ tag: 'input', properties: { type: 'radio', name: 'some-name' } }],
    },
    {
      tag: 'p-radio-button-wrapper',
      properties: {
        label: 'Some label',
        style: { marginTop: '16px' },
      },
      children: [{ tag: 'input', properties: { type: 'radio', name: 'some-name', defaultChecked: true } }],
    },
  ],
};

export const radioButtonWrapperStorySlots: Story<'p-radio-button-wrapper'> = {
  state: {
    properties: {
      state: 'error',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-radio-button-wrapper',
      properties,
      children: [
        {
          tag: 'span',
          properties: { slot: 'label', id: 'some-label-id-1' },
          children: [
            'Some label with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        { tag: 'input', properties: { type: 'radio', name: 'some-name', 'aria-labelledby': 'some-label-id-1' } },
      ],
    },
    {
      tag: 'p-radio-button-wrapper',
      properties: {
        label: 'Some label',
        state: 'error',
        style: { marginTop: '16px' },
      },
      children: [
        {
          tag: 'span',
          properties: { slot: 'label', id: 'some-label-id-2' },
          children: [
            'Some label with a ',
            { tag: 'a', properties: { href: 'https://designsystem.porsche.com' }, children: ['link'] },
            '.',
          ],
        },
        {
          tag: 'input',
          properties: {
            type: 'radio',
            name: 'some-name',
            'aria-labelledby': 'some-label-id-2',
            'aria-describedby': 'some-message-id',
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
