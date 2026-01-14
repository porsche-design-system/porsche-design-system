'use client';

import type { Story } from '@/models/story';

export const spacingFluidScssStory: Story<'div'> = {
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
            'width: $pds-spacing-fluid-x-small; height: $pds-spacing-fluid-x-small;',
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
            'width: $pds-spacing-fluid-small; height: $pds-spacing-fluid-small;',
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
            'width: $pds-spacing-fluid-medium; height: $pds-spacing-fluid-medium;',
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
            'width: $pds-spacing-fluid-large; height: $pds-spacing-fluid-large;',
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
            'width: $pds-spacing-fluid-x-large; height: $pds-spacing-fluid-x-large;',
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
            'width: $pds-spacing-fluid-xx-large; height: $pds-spacing-fluid-xx-large;',
          ],
        },
      ],
    },
  ],
};

export const spacingStaticScssStory: Story<'div'> = {
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
            'width: $pds-spacing-static-x-small; height: $pds-spacing-static-x-small;',
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
            'width: $pds-spacing-static-small; height: $pds-spacing-static-small;',
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
            'width: $pds-spacing-static-medium; height: $pds-spacing-static-medium;',
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
            'width: $pds-spacing-static-large; height: $pds-spacing-static-large;',
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
            'width: $pds-spacing-static-x-large; height: $pds-spacing-static-x-large;',
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
            'width: $pds-spacing-static-xx-large; height: $pds-spacing-static-xx-large;',
          ],
        },
      ],
    },
  ],
};
