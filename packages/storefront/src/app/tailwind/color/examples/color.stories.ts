'use client';

import type { Story } from '@/models/story';

export const colorStoryBackgroundColor: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: {
        className: 'grid gap-fluid-sm text-sm text-primary',
      },
      children: [
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-base w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-base',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-surface w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-surface',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-shading w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-shading',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-frosted w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-frosted',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-success-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-success-soft',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-warning-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-warning-soft',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-error-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-error-soft',
          ],
        },
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'bg-info-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-info-soft',
          ],
        },
      ],
    },
  ],
};

export const colorStoryTextColor: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: {
        className: 'grid gap-fluid-sm text-sm',
      },
      children: [
        {
          tag: 'li',
          properties: { className: 'text-primary' },
          children: ['.text-primary'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-medium' },
          children: ['.text-contrast-medium'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-high' },
          children: ['.text-contrast-high'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success' },
          children: ['.text-success'],
        },
        {
          tag: 'li',
          properties: { className: 'text-warning' },
          children: ['.text-warning'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error' },
          children: ['.text-error'],
        },
        {
          tag: 'li',
          properties: { className: 'text-info' },
          children: ['.text-info'],
        },
      ],
    },
  ],
};
