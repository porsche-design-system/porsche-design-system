'use client';

import type { Story } from '@/models/story';

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

