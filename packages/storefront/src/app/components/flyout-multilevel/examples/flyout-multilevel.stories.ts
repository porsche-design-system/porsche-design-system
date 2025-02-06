'use client';

import type { ElementConfig, HTMLTagOrComponent } from '@/components/playground/ConfiguratorControls';
import type { Story } from '@/models/story';
import type { FlyoutMultilevelUpdateEventDetail } from '@porsche-design-system/components-react/ssr';

export const flyoutMultilevelStory: Story<'p-flyout-multilevel'> = {
  state: {
    properties: {
      open: false,
      activeIdentifier: undefined,
      aria: { 'aria-label': 'Main' },
    },
  },
  generator: ({ properties } = {}, updateState = () => {}) => [
    {
      tag: 'nav',
      properties: { 'aria-label': 'Main' },
      children: [
        {
          tag: 'p-button',
          properties: {
            type: 'button',
            aria: { 'aria-haspopup': 'dialog' },
            onClick: () => updateState?.('p-flyout-multilevel', 'open', true),
          },
          children: ['Open Flyout Multilevel'],
        },
        {
          tag: 'p-flyout-multilevel',
          properties: {
            ...properties,
            onDismiss: () => updateState?.('p-flyout-multilevel', 'open', false),
            onUpdate: (e: CustomEvent<FlyoutMultilevelUpdateEventDetail>) =>
              updateState?.('p-flyout-multilevel', 'activeIdentifier', e.detail.activeIdentifier),
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
