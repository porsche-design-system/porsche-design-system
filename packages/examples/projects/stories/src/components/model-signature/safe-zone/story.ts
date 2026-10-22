'use client';

import { MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/assets';
import type { ElementConfig, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';

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
