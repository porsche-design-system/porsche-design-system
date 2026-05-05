'use client';

import type { SlotStories, Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const inputSearchSlotStories: SlotStories<'p-input-search'> = {
  start: {
    unit: {
      name: 'Text',
      generator: () => [
        {
          tag: 'p-text',
          properties: { slot: 'start', color: 'contrast-medium', 'aria-hidden': true },
          children: ['Search'],
        },
      ],
    },
    button: {
      name: 'Button',
      generator: () => [
        {
          tag: 'p-button-pure',
          properties: {
            slot: 'start',
            icon: 'information',
            hideLabel: true,
            className: 'p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)',
          },
        },
      ],
    },
    icon: {
      name: 'Icon',
      generator: () => [
        {
          tag: 'p-icon',
          properties: { slot: 'start', name: 'shopping-cart', color: 'contrast-medium', 'aria-hidden': true },
        },
      ],
    },
  },
  end: {
    unit: {
      name: 'Text',
      generator: () => [
        {
          tag: 'p-text',
          properties: { slot: 'end', color: 'contrast-medium', 'aria-hidden': true },
          children: ['Search'],
        },
      ],
    },
    button: {
      name: 'Button',
      generator: () => [
        {
          tag: 'p-button-pure',
          properties: {
            slot: 'end',
            icon: 'information',
            hideLabel: true,
            className: 'p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)',
          },
        },
      ],
    },
    icon: {
      name: 'Icon',
      generator: () => [
        {
          tag: 'p-icon',
          properties: { slot: 'end', name: 'shopping-cart', color: 'contrast-medium', 'aria-hidden': true },
        },
      ],
    },
  },
  'label-after': {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-popover',
          properties: { slot: 'label-after' },
          children: ['Some Popover Content.'],
        },
      ],
    },
  },
};

export const inputSearchStory: Story<'p-input-search'> = {
  state: {
    properties: { label: 'Some label', name: 'Some name', clear: true, indicator: true },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-input-search',
      properties,
      children: [
        ...(slots?.start?.generator() ?? []),
        ...(slots?.end?.generator() ?? []),
        ...(slots?.['label-after']?.generator() ?? []),
      ],
    },
  ],
};

export const inputSearchStoryAriaComboboxSketch: Story<'p-input-search'> = {
  generator: (): (string | ElementConfig<HTMLTagOrComponent> | undefined)[] => [
    {
      tag: 'div',
      properties: {
        className: 'flex w-full max-w-md flex-col gap-static-xs self-start [&>p-input-search]:min-w-0',
      },
      children: [
        {
          tag: 'p-input-search',
          properties: {
            label: 'Search',
            name: 'aria-sketch',
            indicator: true,
            clear: true,
            aria: {
              role: 'combobox',
              'aria-expanded': true,
              'aria-haspopup': 'listbox',
              'aria-autocomplete': 'list',
              'aria-controls': 'listbox',
            },
          },
        },
        {
          tag: 'div',
          properties: {
            id: 'listbox',
            role: 'listbox',
            tabIndex: 0,
            'aria-label': 'Search options',
            className:
              'max-h-48 p-static-sm overflow-y-auto rounded-xl border-thin border-contrast-lower bg-background-base shadow-md ',
          },
          children: [
            {
              tag: 'div',
              properties: {
                role: 'option',
                'aria-selected': 'false',
                className:
                  'px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm',
              },
              children: ['718'],
            },
            {
              tag: 'div',
              properties: {
                role: 'option',
                'aria-selected': 'false',
                className:
                  'px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm',
              },
              children: ['911'],
            },
            {
              tag: 'div',
              properties: {
                role: 'option',
                'aria-selected': 'true',
                className:
                  'flex px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm',
              },
              children: [
                {
                  tag: 'span',
                  children: ['Cayenne'],
                },
                {
                  tag: 'p-icon',
                  properties: { name: 'check', color: 'primary', 'aria-hidden': true, className: 'ms-auto' },
                },
              ],
            },
            {
              tag: 'div',
              properties: {
                role: 'option',
                'aria-selected': 'false',
                className:
                  'px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm',
              },
              children: ['Macan'],
            },
            {
              tag: 'div',
              properties: {
                role: 'option',
                'aria-selected': 'false',
                className:
                  'px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm',
              },
              children: ['Panamera'],
            },
            {
              tag: 'div',
              properties: {
                role: 'option',
                'aria-selected': 'false',
                className:
                  'px-static-sm py-static-sm cursor-pointer bg-background-base hover:bg-frosted transition-colors duration-300 rounded-sm',
              },
              children: ['Taycan'],
            },
          ],
        },
      ],
    },
  ],
};

export const inputSearchStorySlots: Story<'p-input-search'> = {
  generator: () => [
    {
      tag: 'p-input-search',
      properties: { state: 'error' },
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
            ' and a "label-after" slot.',
          ],
        },
        {
          tag: 'p-popover',
          properties: { slot: 'label-after' },
          children: [
            'Some Popover content with a ',
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
          tag: 'p-icon',
          properties: { slot: 'start', name: 'pin', color: 'contrast-medium', 'aria-hidden': true },
        },
        {
          tag: 'p-button-pure',
          properties: {
            slot: 'end',
            icon: 'locate',
            hideLabel: true,
            className: 'p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)',
            aria: { 'aria-label': 'Locate' },
          },
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
      ],
    },
  ],
};
