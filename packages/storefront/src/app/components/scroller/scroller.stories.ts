'use client';

import type { Story } from '@/models/story';
import type { ElementConfig } from '@/utils/generator/generator';

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

export const scrollerStoryHeight: Story<'p-scroller'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-scroller',
      properties: { ...properties, className: 'max-w-[600px] whitespace-nowrap' },
      children: [
        ...(new Array(5).fill(null).map(() => ({
          tag: 'p-tag-dismissible',
          properties: {
            className: 'me-static-md',
          },
          children: ['Some tag content'],
        })) as ElementConfig<'p-tag-dismissible'>[]),
      ],
    },
  ],
};
