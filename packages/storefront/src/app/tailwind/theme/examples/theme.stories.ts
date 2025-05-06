'use client';

import type { Story } from '@/models/story';

export const themeStoryBackground: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: {
        className: 'flex flex-col flex-wrap items-start justify-center gap-static-sm p-fluid-sm',
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
              properties: { className: 'bg-background-base w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-background-base',
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
              properties: { className: 'bg-background-surface w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-background-surface',
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
              properties: { className: 'bg-background-shading w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-background-shading',
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
              properties: { className: 'bg-background-frosted w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-background-frosted',
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
              properties: { className: 'bg-notification-success-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-notification-success-soft',
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
              properties: { className: 'bg-notification-warning-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-notification-warning-soft',
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
              properties: { className: 'bg-notification-error-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-notification-error-soft',
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
              properties: { className: 'bg-notification-info-soft w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-notification-info-soft',
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
              properties: { className: 'bg-state-hover w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-state-hover',
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
              properties: { className: 'bg-state-active w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-state-active',
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
              properties: { className: 'bg-state-disabled w-10 h-10 rounded-md border border-contrast-low' },
            },
            '.bg-state-disabled',
          ],
        },
      ],
    },
  ],
};

export const themeStoryText: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: {
        className: 'flex flex-col flex-wrap items-start justify-center gap-static-sm p-fluid-sm',
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
          properties: { className: 'text-notification-success' },
          children: ['.text-notification-success'],
        },
        {
          tag: 'li',
          properties: { className: 'text-notification-warning' },
          children: ['.text-notification-warning'],
        },
        {
          tag: 'li',
          properties: { className: 'text-notification-error' },
          children: ['.text-notification-error'],
        },
        {
          tag: 'li',
          properties: { className: 'text-notification-info' },
          children: ['.text-notification-info'],
        },
      ],
    },
  ],
};
