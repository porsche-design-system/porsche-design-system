'use client';

import { MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/assets';
import type { CSSProperties } from 'react';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const modelSignatureStory: Story<'p-model-signature'> = {
  generator: ({ properties } = {}) => [
    {
      tag: 'p-model-signature',
      properties,
    },
  ],
};

export const modelSignatureStorySafeZone: Story<'p-model-signature'> = {
  generator: () => [
    ...Object.keys(MODEL_SIGNATURES_MANIFEST).map(
      (model) =>
        ({
          tag: 'div',
          properties: {
            className: 'bg-[#ff000033] inline-block me-static-md mt-static-md',
          },
          children: [
            {
              tag: 'p-model-signature',
              properties: {
                safeZone: false,
                model,
              },
            },
          ],
        }) as string | ElementConfig<HTMLTagOrComponent> | undefined
    ),
  ],
};

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

export const modelSignatureStoryMaskImage: Story<'p-model-signature'> = {
  state: {
    properties: {
      safeZone: false,
      className: '[--p-model-signature-width:auto]',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-model-signature',
      properties,
      children: [
        {
          tag: 'img',
          properties: { src: 'assets/dessert.jpg', alt: 'Dessert' },
        },
      ],
    },
  ],
};

export const modelSignatureStoryMaskVideo: Story<'p-model-signature'> = {
  state: {
    properties: {
      safeZone: false,
      className: '[--p-model-signature-width:auto]',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'p-model-signature',
      properties,
      children: [
        {
          tag: 'video',
          properties: {
            poster: 'assets/ocean.jpg',
            src: 'assets/ocean.mp4',
            autoPlay: true,
            playsInline: true,
            loop: true,
            muted: true,
          },
        },
      ],
    },
  ],
};

export const modelSignatureStoryCustomStyling: Story<'p-model-signature'> = {
  generator: () => [
    {
      tag: 'p-model-signature',
      properties: {
        color: 'inherit',
        className: 'text-info',
      },
    },
    {
      tag: 'p-model-signature',
      properties: {
        className: '[--p-model-signature-width:auto] [--p-model-signature-height:50px] block',
      },
    },
    {
      tag: 'p-model-signature',
      properties: {
        className: '[--p-model-signature-width:50px] [--p-model-signature-height:auto] block',
      },
    },
  ],
};
