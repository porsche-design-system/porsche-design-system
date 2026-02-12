'use client';

import type { Story } from '@/models/story';

export const spacingFluidEmotionStory: Story<'div'> = {
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
            'width: spacingFluidXs, height: spacingFluidXs',
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
            'width: spacingFluidSm, height: spacingFluidSm',
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
            'width: spacingFluidMd, height: spacingFluidMd',
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
            'width: spacingFluidLg, height: spacingFluidLg',
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
            'width: spacingFluidXl, height: spacingFluidXl',
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
            'width: spacingFluid2Xl, height: spacingFluid2Xl',
          ],
        },
      ],
    },
  ],
};

export const spacingStaticEmotionStory: Story<'div'> = {
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
            'width: spacingStaticXs, height: spacingStaticXs',
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
            'width: spacingStaticSm, height: spacingStaticSm',
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
            'width: spacingStaticMd, height: spacingStaticMd',
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
            'width: spacingStaticLg, height: spacingStaticLg',
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
            'width: spacingStaticXl, height: spacingStaticXl',
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
            'width: spacingStatic2Xl, height: spacingStatic2Xl',
          ],
        },
      ],
    },
  ],
};
