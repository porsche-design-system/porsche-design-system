'use client';

import type { Story } from '@/models/story';

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
