'use client';

import type { Story } from '@/models/story';

export const modelSignatureStoryMaskBlendMode: Story<'p-model-signature'> = {
  generator: () => [
    {
      tag: 'div',
      properties: {
        className: 'isolate bg-[#00aa3680] inline-block p-static-lg',
      },
      children: [
        {
          tag: 'p-model-signature',
          properties: {
            color: 'contrast-medium',
            safeZone: false,
            className: 'mix-blend-overlay',
          },
        },
      ],
    },
    {
      tag: 'div',
      properties: {
        className: 'isolate bg-[#f2f2f280] inline-block p-static-lg',
      },
      children: [
        {
          tag: 'p-model-signature',
          properties: {
            color: 'contrast-medium',
            safeZone: false,
            className: 'mix-blend-overlay',
          },
        },
      ],
    },
    {
      tag: 'div',
      properties: {
        className: 'isolate bg-[#1f1f1f80] inline-block p-static-lg',
      },
      children: [
        {
          tag: 'p-model-signature',
          properties: {
            color: 'contrast-medium',
            safeZone: false,
            className: 'mix-blend-overlay',
          },
        },
      ],
    },
    {
      tag: 'div',
      properties: {
        className: 'isolate bg-[#c5004280] inline-block p-static-lg',
      },
      children: [
        {
          tag: 'p-model-signature',
          properties: {
            color: 'contrast-medium',
            safeZone: false,
            className: 'mix-blend-overlay',
          },
        },
      ],
    },
    {
      tag: 'div',
      properties: {
        className: 'isolate bg-[#e1d4a480] inline-block p-static-lg',
      },
      children: [
        {
          tag: 'p-model-signature',
          properties: {
            color: 'contrast-medium',
            safeZone: false,
            className: 'mix-blend-overlay',
          },
        },
      ],
    },
    {
      tag: 'div',
      properties: {
        className: 'isolate bg-[#0099e080] inline-block p-static-lg',
      },
      children: [
        {
          tag: 'p-model-signature',
          properties: {
            color: 'contrast-medium',
            safeZone: false,
            className: 'mix-blend-overlay',
          },
        },
      ],
    },
  ],
};

