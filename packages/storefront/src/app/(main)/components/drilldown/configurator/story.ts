'use client';

import type { Story } from '@/models/story';

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
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (1-2)'] },
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (1-2)'] },
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (1-2)'] },
                    {
                      tag: 'p-drilldown-item',
                      properties: { identifier: 'id-1-2-1', label: 'Some Label (1-2-1)' },
                      children: [
                        { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (1-2-1)'] },
                        { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (1-2-1)'] },
                      ],
                    },
                    { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (1-2)'] },
                  ],
                },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (1-1)'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (1-1)'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (1-1)'] },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-2', label: 'Some Label (2)' },
              children: [
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (2)'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (2)'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (2)'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (2)'] },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-3', label: 'Some Label (3)' },
              children: [
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (3)'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (3)'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (3)'] },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-4', label: 'Some Label (4)' },
              children: [
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (4)'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (4)'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (4)'] },
              ],
            },
            {
              tag: 'p-drilldown-item',
              properties: { identifier: 'id-5', label: 'Some Label (5)' },
              children: [
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (5)'] },
                { tag: 'p-drilldown-link', properties: { href: '#' }, children: ['Some anchor (5)'] },
              ],
            },
          ],
        },
      ],
    },
  ],
};

