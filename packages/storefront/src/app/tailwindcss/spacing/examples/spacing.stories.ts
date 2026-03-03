'use client';

import type { Story } from '@/models/story';

export const spacingFluidStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: { className: 'grid gap-fluid-md prose-text-sm' },
      children: [
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'w-fluid-xs h-fluid-xs bg-info' },
            },
            '.w-fluid-xs .h-fluid-xs',
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
              properties: { className: 'w-fluid-sm h-fluid-sm bg-info' },
            },
            '.w-fluid-sm .h-fluid-sm',
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
              properties: { className: 'w-fluid-md h-fluid-md bg-info' },
            },
            '.w-fluid-md .h-fluid-md',
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
              properties: { className: 'w-fluid-lg h-fluid-lg bg-info' },
            },
            '.w-fluid-lg .h-fluid-lg',
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
              properties: { className: 'w-fluid-xl h-fluid-xl bg-info' },
            },
            '.w-fluid-xl .h-fluid-xl',
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
              properties: { className: 'w-fluid-2xl h-fluid-2xl bg-info' },
            },
            '.w-fluid-2xl .h-fluid-2xl',
          ],
        },
      ],
    },
  ],
};

export const spacingStaticStory: Story<'div'> = {
  generator: () => [
    {
      tag: 'ul',
      properties: { className: 'grid gap-fluid-md prose-text-sm' },
      children: [
        {
          tag: 'li',
          properties: {
            className: 'flex items-center gap-static-md',
          },
          children: [
            {
              tag: 'div',
              properties: { className: 'w-static-xs h-static-xs bg-error' },
            },
            '.w-static-xs .h-static-xs',
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
              properties: { className: 'w-static-sm h-static-sm bg-error' },
            },
            '.w-static-sm .h-static-sm',
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
              properties: { className: 'w-static-md h-static-md bg-error' },
            },
            '.w-static-md .h-static-md',
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
              properties: { className: 'w-static-lg h-static-lg bg-error' },
            },
            '.w-static-lg .h-static-lg',
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
              properties: { className: 'w-static-xl h-static-xl bg-error' },
            },
            '.w-static-xl .h-static-xl',
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
              properties: { className: 'w-static-2xl h-static-2xl bg-error' },
            },
            '.w-static-2xl .h-static-2xl',
          ],
        },
      ],
    },
  ],
};
