import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const vagueTileLabelWithoutContextA11yExample = {
  name: 'Vague tile label without context',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button-tile',
          properties: { label: 'Open' },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-button-tile',
          properties: { label: 'Configure Porsche Taycan' },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
