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
              eventType: 'FlyoutMultilevelUpdateEventDetail',
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

export const flyoutMultilevelActiveIdentifier: Story<'p-flyout-multilevel'> = {
  state: {
    properties: {
      open: false,
      activeIdentifier: 'id-2',
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
              eventType: 'FlyoutMultilevelUpdateEventDetail',
            },
          },
          children: [
            ...(['id-1', 'id-2', 'id-3', 'id-4', 'id-5'].map((id) => ({
              tag: 'p-flyout-multilevel-item',
              properties: { identifier: id, label: 'Some Label' },
              children: [
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
              ].filter(Boolean),
            })) as ElementConfig<'p-flyout-multilevel-item'>[]),
          ],
        },
      ],
    },
  ],
};

export const flyoutMultilevelStoryCustomContent: Story<'p-flyout-multilevel'> = {
  state: {
    properties: {
      open: false,
      activeIdentifier: 'id-1',
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
            'aria-haspopup': 'dialog',
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
              eventType: 'FlyoutMultilevelUpdateEventDetail',
            },
          },
          children: [
            {
              tag: 'p-flyout-multilevel-item',
              properties: { identifier: 'id-1', label: 'Some Label' },
              children: [
                {
                  tag: 'p-link-tile',
                  properties: {
                    href: '#',
                    label: 'Some label',
                    description: 'Some Description',
                    weight: 'semi-bold',
                    compact: 'true',
                    aspectRatio: { base: '4/3', xs: '16/9', s: '1/1' },
                    style: { marginBottom: 'clamp(8px, 0.5vw + 6px, 16px)' },
                  },
                  children: [
                    {
                      tag: 'img',
                      properties: {
                        srcSet: 'assets/porsche-963@2x.webp 2x',
                        src: 'assets/porsche-963.webp',
                        width: 636,
                        height: 847,
                        alt: 'Porsche 963',
                      },
                    },
                  ],
                },
                ...new Array(9).fill({
                  tag: 'a',
                  properties: { href: '#' },
                  children: ['Some anchor'],
                }),
              ],
            },
            {
              tag: 'p-flyout-multilevel-item',
              properties: { identifier: 'id-2', label: 'Some Label' },
              children: [
                {
                  tag: 'p-flyout-multilevel-item',
                  properties: { identifier: 'id-2-1', label: 'Some Label' },
                  children: [
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                  ],
                },
                {
                  tag: 'p-flyout-multilevel-item',
                  properties: { identifier: 'id-2-2', label: 'Some Label' },
                  children: [
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                  ],
                },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
              ],
            },
            {
              tag: 'p-flyout-multilevel-item',
              properties: { identifier: 'id-3', label: 'Some Label' },
              children: [
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
              ],
            },
            {
              tag: 'p-flyout-multilevel-item',
              properties: { identifier: 'id-4', label: 'Some Label' },
              children: [
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
              ],
            },
            {
              tag: 'p-flyout-multilevel-item',
              properties: { identifier: 'id-5', label: 'Some Label' },
              children: [
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'a', properties: { href: '#' }, children: ['Some anchor'] },
              ],
            },
            {
              tag: 'p-link-pure',
              properties: {
                size: 'medium',
                href: '#',
                icon: 'external',
                style: {
                  padding: 'clamp(8px, 0.5vw + 6px, 16px)',
                  margin: '0 calc(clamp(8px, 0.5vw + 6px, 16px) * -1)',
                },
              },
              children: ['Some external anchor'],
            },
          ],
        },
      ],
    },
  ],
};
