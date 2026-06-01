'use client';

import type { Story } from '@/models/story';

export const scrollerStory: Story<'p-scroller'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-scroller',
      properties: { ...properties, className: 'max-w-[600px] whitespace-nowrap' },
      children: [
        {
          tag: 'p-tag',
          properties: { className: 'me-static-md', color: 'primary' },
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
          properties: { className: 'me-static-md', color: 'notification-info-soft' },
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
          properties: { className: 'me-static-md', color: 'notification-warning-soft' },
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
          properties: { className: 'me-static-md', color: 'primary' },
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
          properties: { className: 'me-static-md', color: 'notification-info-soft' },
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
          properties: { className: 'me-static-md', color: 'notification-warning-soft' },
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
          properties: { className: 'me-static-md', color: 'primary' },
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
  ],
};

