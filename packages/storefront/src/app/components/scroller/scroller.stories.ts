'use client';

import type { Story } from '@/models/story';
import type { ElementConfig } from '@/utils/generator/generator';

export const scrollerStory: Story<'p-scroller'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-scroller',
      properties: { ...properties, className: 'scroller' },
      children: [
        {
          tag: 'p-tag',
          properties: { color: 'primary' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          properties: { color: 'notification-info-soft' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          properties: { color: 'notification-warning-soft' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          properties: { color: 'primary' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          properties: { color: 'notification-info-soft' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          properties: { color: 'notification-warning-soft' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          properties: { color: 'primary' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
        {
          tag: 'p-tag',
          properties: { color: 'notification-info-soft' },
          children: [
            {
              tag: 'button',
              properties: { type: 'button' },
              children: ['Some tag content'],
            },
          ],
        },
      ],
    },
    {
      tag: 'style',
      children: [
        `.scroller {
    max-width: 600px;
    & > :not(:last-child) {
      margin-inline-end: 16px;
    }
  }`,
      ],
    },
  ],
};

export const scrollerStoryHeight: Story<'p-scroller'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-scroller',
      properties: { ...properties, className: 'scroller', style: { whiteSpace: 'nowrap' } },
      children: [
        ...(new Array(5).fill(null).map(() => ({
          tag: 'p-tag-dismissible',
          children: ['Some tag content'],
        })) as ElementConfig<'p-tag-dismissible'>[]),
      ],
    },
    {
      tag: 'style',
      children: [
        `.scroller {
    max-width: 600px;
    & > :not(:last-child) {
      margin-inline-end: 16px;
    }
  }`,
      ],
    },
  ],
};

export const scrollerStorySize: Story<'p-scroller'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-scroller',
      properties: { ...properties, className: 'scroller', style: { fontSize: '24px', whiteSpace: 'nowrap' } },
      children: [
        ...(new Array(5).fill(null).map(() => ({
          tag: 'p-tag-dismissible',
          children: ['Some tag content'],
        })) as ElementConfig<'p-tag-dismissible'>[]),
      ],
    },
    {
      tag: 'style',
      children: [
        `.scroller {
    max-width: 600px;
    & > :not(:last-child) {
      margin-inline-end: 16px;
    }
  }`,
      ],
    },
  ],
};
