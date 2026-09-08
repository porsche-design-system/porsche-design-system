import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-tabs',
          properties: { 'aria-label': 'Product details' },
          children: [
            {
              tag: 'p-tabs-item',
              properties: { label: 'Overview' },
              children: ['...'],
            },
          ],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-tabs',
          properties: { aria: { 'aria-label': 'Porsche 911 configuration details' } },
          children: [
            {
              tag: 'p-tabs-item',
              properties: { label: 'Overview' },
              children: ['...'],
            },
            {
              tag: 'p-tabs-item',
              properties: { label: 'Equipment' },
              children: ['...'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
