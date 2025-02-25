'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const flyoutMultilevelStory: Story<'p-flyout-multilevel'> = {
  state: {
    properties: {
      open: false,
      activeIdentifier: undefined,
      aria: { 'aria-label': 'Main' },
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'nav',
      properties: { 'aria-label': 'Main' },
      children: [
        {
          tag: 'p-button',
          properties: {
            type: 'button',
            aria: { 'aria-haspopup': 'dialog' },
          },
          events: {
            onClick: {
              target: 'p-flyout-multilevel',
              prop: 'open',
              value: true,
            },
          },
          children: ['Open Flyout Multilevel'],
        },
        {
          tag: 'p-flyout-multilevel',
          properties,
          events: {
            onDismiss: {
              target: 'p-flyout-multilevel',
              prop: 'open',
              value: false,
            },
            onUpdate: {
              target: 'p-flyout-multilevel',
              prop: 'activeIdentifier',
              eventValueKey: 'activeIdentifier',
              eventType: 'CustomEvent<FlyoutMultilevelUpdateEventDetail>',
            },
          },
          children: [
            {
              tag: 'p-flyout-multilevel-item',
              properties: { identifier: 'id-1', label: 'Some Label' },
              children: [
                {
                  tag: 'p-flyout-multilevel-item',
                  properties: { identifier: 'id-1-1', label: 'Some Label' },
                  children: [
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                  ],
                },
                {
                  tag: 'p-flyout-multilevel-item',
                  properties: { identifier: 'id-1-2', label: 'Some Label' },
                  children: [
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                    {
                      tag: 'p-flyout-multilevel-item',
                      properties: { identifier: 'id-1-2-1', label: 'Some Label' },
                      children: [
                        { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                        { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                      ],
                    },
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                  ],
                },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
              ],
            },
            ...(['id-2', 'id-3', 'id-4', 'id-5'].map((id) => ({
              tag: 'p-flyout-multilevel-item',
              properties: { identifier: id, label: 'Some Label' },
              children: [
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
              ].filter(Boolean),
            })) as (string | ElementConfig<HTMLTagOrComponent> | undefined)[]),
          ],
        },
      ],
    },
  ],
};
