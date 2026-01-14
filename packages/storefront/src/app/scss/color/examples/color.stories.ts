'use client';

import type { Story } from '@/models/story';

export const colorScssStoryTextColor: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: {
        className: 'grid gap-fluid-sm prose-text-sm',
      },
      children: [
        {
          tag: 'li',
          properties: { className: 'text-primary' },
          children: ['color: $pds-theme-{light|dark}-primary;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-high' },
          children: ['color: $pds-theme-{light|dark}-contrast-high;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-medium' },
          children: ['color: $pds-theme-{light|dark}-contrast-medium;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-contrast-low' },
          children: ['color: $pds-theme-{light|dark}-contrast-low;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-success' },
          children: ['color: $pds-theme-{light|dark}-notification-success;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-warning' },
          children: ['color: $pds-theme-{light|dark}-notification-warning;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-error' },
          children: ['color: $pds-theme-{light|dark}-notification-error;'],
        },
        {
          tag: 'li',
          properties: { className: 'text-info' },
          children: ['color: $pds-theme-{light|dark}-notification-info;'],
        },
      ],
    },
  ],
};

export const colorScssStoryBackgroundColor: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: {
        className: 'grid gap-fluid-sm prose-text-sm',
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
              properties: { className: 'bg-canvas w-10 h-10 rounded-md border border-contrast-low' },
            },
            'background-color: $pds-theme-{light|dark}-background-base;',
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
            'background-color: $pds-theme-{light|dark}-background-surface;',
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
            'background-color: $pds-theme-{light|dark}-background-frosted;',
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
              properties: { className: 'bg-backdrop w-10 h-10 rounded-md border border-contrast-low' },
            },
            'background-color: $pds-theme-{light|dark}-background-shading;',
          ],
        },
      ],
    },
  ],
};

export const colorScssStoryBorderColor: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: {
        className: 'grid gap-fluid-sm prose-text-sm',
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
              properties: { className: 'border-primary w-10 h-10 rounded-md border' },
            },
            'border-color: $pds-theme-{light|dark}-primary;',
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
              properties: { className: 'border-contrast-high w-10 h-10 rounded-md border' },
            },
            'border-color: $pds-theme-{light|dark}-contrast-high;',
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
              properties: { className: 'border-contrast-medium w-10 h-10 rounded-md border' },
            },
            'border-color: $pds-theme-{light|dark}-contrast-medium;',
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
              properties: { className: 'border-contrast-low w-10 h-10 rounded-md border' },
            },
            'border-color: $pds-theme-{light|dark}-contrast-low;',
          ],
        },
      ],
    },
  ],
};
