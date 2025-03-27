'use client';

import type { Story } from '@/models/story';

export const tagStory: Story<'p-tag'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-tag',
      properties,
      children: ['Some label'],
    },
  ],
};

export const tagStorySlottedButton: Story<'p-tag'> = {
  generator: () => [
    {
      tag: 'p-tag',
      properties: { icon: 'car', color: 'background-base' },
      children: [{ tag: 'button', properties: { type: 'button' }, children: ['Color background-base'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'background-surface' },
      children: [{ tag: 'button', properties: { type: 'button' }, children: ['Color background-surface'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'background-default' },
      children: [{ tag: 'button', properties: { type: 'button' }, children: ['Color background-default'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'background-frosted' },
      children: [{ tag: 'button', properties: { type: 'button' }, children: ['Color background-frosted'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'primary' },
      children: [{ tag: 'button', properties: { type: 'button' }, children: ['Color primary'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'notification-info-soft' },
      children: [{ tag: 'button', properties: { type: 'button' }, children: ['Color notification-info-soft'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'notification-warning-soft' },
      children: [{ tag: 'button', properties: { type: 'button' }, children: ['Color notification-warning-soft'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'notification-success-soft' },
      children: [{ tag: 'button', properties: { type: 'button' }, children: ['Color notification-success-soft'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'notification-error-soft' },
      children: [{ tag: 'button', properties: { type: 'button' }, children: ['Color notification-error-soft'] }],
    },
  ],
};

export const tagStorySlottedLink: Story<'p-tag'> = {
  generator: () => [
    {
      tag: 'p-tag',
      properties: { icon: 'car', color: 'background-base' },
      children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Color background-base'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'background-surface' },
      children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Color background-surface'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'background-default' },
      children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Color background-default'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'background-frosted' },
      children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Color background-frosted'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'primary' },
      children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Color primary'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'notification-info-soft' },
      children: [{ tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Color notification-info-soft'] }],
    },
    {
      tag: 'p-tag',
      properties: { color: 'notification-warning-soft' },
      children: [
        { tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Color notification-warning-soft'] },
      ],
    },
    {
      tag: 'p-tag',
      properties: { color: 'notification-success-soft' },
      children: [
        { tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Color notification-success-soft'] },
      ],
    },
    {
      tag: 'p-tag',
      properties: { color: 'notification-error-soft' },
      children: [
        { tag: 'a', properties: { href: 'https://porsche.com' }, children: ['Color notification-error-soft'] },
      ],
    },
  ],
};

export const tagStoryMultiline: Story<'p-tag'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        style: { width: '100px' },
      },
      children: [
        {
          tag: 'p-tag',
          properties: { color: 'notification-success-soft', style: { whiteSpace: 'normal' } },
          children: ['Some label with longer text wrapped in a narrow container'],
        },
      ],
    },
  ],
};
