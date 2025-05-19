'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';
import type { CSSProperties } from 'react';

export const drilldownStory: Story<'p-drilldown'> = {
  state: {
    properties: {
      open: false,
      activeIdentifier: undefined,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'nav',
      properties: { 'aria-label': 'Main' },
      children: [
        {
          tag: 'p-button',
          properties: { type: 'button', aria: { 'aria-haspopup': 'dialog' } },
          events: {
            onClick: {
              target: 'p-drilldown',
              prop: 'open',
              value: true,
            },
          },
          children: ['Open Drilldown'],
        },
        {
          tag: 'p-drilldown',
          properties,
          events: {
            onUpdate: {
              target: 'p-drilldown',
              prop: 'activeIdentifier',
              eventValueKey: 'activeIdentifier',
              eventType: 'DrilldownUpdateEventDetail',
            },
            onDismiss: {
              target: 'p-drilldown',
              prop: 'open',
              value: false,
            },
          },
          children: [
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-1', label: 'Some Label (1)' },
              children: [
                {
                  tag: 'p-drilldown-item',
                  properties: { identifier: 'id-1-1', label: 'Some Label (1-1)' },
                  children: [
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor (1-1)'],
                    },
                    {
                      tag: 'p-drilldown-link',
                      children: [{ tag: 'a', properties: { href: '#' }, children: ['Some anchor (1-1)'] }],
                    },
                  ],
                },
                {
                  tag: 'p-drilldown-item',
                  properties: { identifier: 'id-1-2', label: 'Some Label (1-2)' },
                  children: [
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor (1-2)'],
                    },
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor (1-2)'],
                    },
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor (1-2)'],
                    },
                    {
                      tag: 'p-drilldown-item',
                      properties: { identifier: 'id-1-2-1', label: 'Some Label (1-2-1)' },
                      children: [
                        {
                          tag: 'p-drilldown-link',
                          properties: { href: '#' },
                          children: ['Some anchor (1-2-1)'],
                        },
                        {
                          tag: 'p-drilldown-link',
                          properties: { href: '#' },
                          children: ['Some anchor (1-2-1)'],
                        },
                      ],
                    },
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor (1-2)'],
                    },
                  ],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (1-1)'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (1-1)'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (1-1)'],
                },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-2', label: 'Some Label (2)' },
              children: [
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (2)'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (2)'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (2)'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (2)'],
                },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-3', label: 'Some Label (3)' },
              children: [
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (3)'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (3)'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (3)'],
                },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-4', label: 'Some Label (4)' },
              children: [
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (4)'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (4)'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (4)'],
                },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-5', label: 'Some Label (5)' },
              children: [
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (5)'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor (5)'],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const drilldownStoryCustomContent: Story<'p-drilldown'> = {
  state: {
    properties: {
      open: false,
      activeIdentifier: 'id-1',
      className: '[--p-drilldown-grid-template:repeat(5,auto)_minmax(0,1fr)/auto]',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'nav',
      properties: { 'aria-label': 'Main' },
      children: [
        {
          tag: 'p-button',
          properties: { type: 'button', aria: { 'aria-haspopup': 'dialog' } },
          events: {
            onClick: {
              target: 'p-drilldown',
              prop: 'open',
              value: true,
            },
          },
          children: ['Open Drilldown'],
        },
        {
          tag: 'p-drilldown',
          properties,
          events: {
            onUpdate: {
              target: 'p-drilldown',
              prop: 'activeIdentifier',
              eventValueKey: 'activeIdentifier',
              eventType: 'DrilldownUpdateEventDetail',
            },
            onDismiss: {
              target: 'p-drilldown',
              prop: 'open',
              value: false,
            },
          },
          children: [
            {
              tag: 'p-drilldown-item',
              properties: {
                identifier: 'id-1',
                label: 'Motorsport',
                className: '[--p-drilldown-grid-template:auto/repeat(2,minmax(0,1fr))] [--p-drilldown-gap:0px_16px]',
              },
              children: [
                {
                  tag: 'p-drilldown-item',
                  properties: { identifier: 'id-1-1', label: '718' },
                  children: [
                    {
                      tag: 'p-model-signature',
                      properties: { slot: 'header', model: '718' },
                    },
                    {
                      tag: 'p-button-tile',
                      properties: {
                        slot: 'button',
                        label: 'Some label',
                        description: '718',
                        weight: 'semi-bold',
                        compact: true,
                        aspectRatio: { base: '1/1', s: '9/16' },
                        className: 'mb-fluid-sm',
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
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor'],
                    },
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor'],
                    },
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor'],
                    },
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor'],
                    },
                  ],
                },
                {
                  tag: 'p-drilldown-item',
                  properties: { identifier: 'id-1-2', label: '911' },
                  children: [
                    {
                      tag: 'p-model-signature',
                      properties: { slot: 'header', model: '911' },
                    },
                    {
                      tag: 'p-button-tile',
                      properties: {
                        slot: 'button',
                        label: 'Some label',
                        description: '911',
                        weight: 'semi-bold',
                        compact: true,
                        aspectRatio: { base: '1/1', s: '9/16' },
                        className: 'mb-fluid-sm',
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
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor'],
                    },
                    {
                      tag: 'p-drilldown-link',
                      properties: { href: '#' },
                      children: ['Some anchor'],
                    },
                  ],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor'],
                },
                {
                  tag: 'p-drilldown-link',
                  properties: { href: '#', 'aria-current': 'page' },
                  children: ['Some anchor'],
                },
                ...(new Array(7).fill(null).map(() => ({
                  tag: 'p-drilldown-link',
                  properties: { href: '#' },
                  children: ['Some anchor'],
                })) as (string | ElementConfig<HTMLTagOrComponent> | undefined)[]),
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-2', label: 'Some label' },
              children: [
                {
                  tag: 'p-drilldown-item',
                  properties: { identifier: 'id-2-1', label: 'Some label' },
                  children: [
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                  ],
                },
                {
                  tag: 'p-drilldown-item',
                  properties: { identifier: 'id-2-2', label: 'Some label' },
                  children: [
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                  ],
                },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-3', label: 'Some label' },
              children: [
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-4', label: 'Some label' },
              children: [
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-5', label: 'Some label' },
              children: [
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor'] },
              ],
            },
            {
              tag: 'p-link',
              properties: {
                href: '#',
                variant: 'secondary',
                icon: 'external',
                className: 'self-end',
              },
              children: ['Some external anchor'],
            },
          ],
        },
      ],
    },
  ],
};
