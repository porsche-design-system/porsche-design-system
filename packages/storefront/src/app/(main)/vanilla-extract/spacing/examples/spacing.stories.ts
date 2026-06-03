'use client';

import type { Story } from '@/models/story';

export const spacingFluidVanillaExtractStory: Story<'div'> = {
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
              properties: { className: 'w-fluid-xs h-fluid-xs bg-[blue]/50' },
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
              properties: { className: 'w-fluid-sm h-fluid-sm bg-[blue]/50' },
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
              properties: { className: 'w-fluid-md h-fluid-md bg-[blue]/50' },
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
              properties: { className: 'w-fluid-lg h-fluid-lg bg-[blue]/50' },
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
              properties: { className: 'w-fluid-xl h-fluid-xl bg-[blue]/50' },
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
              properties: { className: 'w-fluid-2xl h-fluid-2xl bg-[blue]/50' },
            },
            'width: spacingFluid2Xl, height: spacingFluid2Xl',
          ],
        },
      ],
    },
  ],
};

export const spacingStaticVanillaExtractStory: Story<'div'> = {
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
              properties: { className: 'w-static-2xs h-static-2xs bg-[deeppink]/50' },
            },
            'width: spacingStatic2Xs, height: spacingStatic2Xs',
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
              properties: { className: 'w-static-xs h-static-xs bg-[deeppink]/50' },
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
              properties: { className: 'w-static-sm h-static-sm bg-[deeppink]/50' },
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
              properties: { className: 'w-static-md h-static-md bg-[deeppink]/50' },
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
              properties: { className: 'w-static-lg h-static-lg bg-[deeppink]/50' },
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
              properties: { className: 'w-static-xl h-static-xl bg-[deeppink]/50' },
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
              properties: { className: 'w-static-2xl h-static-2xl bg-[deeppink]/50' },
            },
            'width: spacingStatic2Xl, height: spacingStatic2Xl',
          ],
        },
      ],
    },
  ],
};
