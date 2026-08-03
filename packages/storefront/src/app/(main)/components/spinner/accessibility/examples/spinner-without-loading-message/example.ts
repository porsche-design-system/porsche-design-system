import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const spinnerWithoutLoadingMessageA11yExample = {
  name: 'Spinner without loading message',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-spinner',
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-spinner',
          properties: { aria: { 'aria-label': 'Loading vehicle configuration' } },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
