'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

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

