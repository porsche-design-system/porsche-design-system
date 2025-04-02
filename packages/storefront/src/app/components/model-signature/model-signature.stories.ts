'use client';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';
import { MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/assets';
import type { CSSProperties } from 'react';

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
            style: { background: '#ff000033', display: 'inline-block', marginInlineEnd: '16px', marginTop: '16px' },
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
    ...['#00aa3680', '#f2f2f280', '#1f1f1f80', '#c5004280', '#e1d4a480', '#0099e080'].map(
      (background) =>
        ({
          tag: 'div',
          properties: {
            style: { background, display: 'inline-block', padding: '32px', isolation: 'isolate' },
          },
          children: [
            {
              tag: 'p-model-signature',
              properties: {
                color: 'contrast-medium',
                safeZone: false,
                style: { mixBlendMode: 'overlay' },
              },
            },
          ],
        }) as string | ElementConfig<HTMLTagOrComponent> | undefined
    ),
  ],
};

export const modelSignatureStoryMaskImage: Story<'p-model-signature'> = {
  state: {
    properties: {
      safeZone: false,
      style: { '--p-model-signature-width': 'auto' } as CSSProperties,
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
      style: { '--p-model-signature-width': 'auto' } as CSSProperties,
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
            autoplay: true,
            playsinline: true,
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
        style: { '--p-model-signature-color': 'deeppink' } as CSSProperties,
      },
    },
    {
      tag: 'p-model-signature',
      properties: {
        style: { '--p-model-signature-width': 'auto', '--p-model-signature-height': '50px' } as CSSProperties,
      },
    },
    {
      tag: 'p-model-signature',
      properties: {
        style: { '--p-model-signature-width': '50px', '--p-model-signature-height': 'auto' } as CSSProperties,
      },
    },
  ],
};
