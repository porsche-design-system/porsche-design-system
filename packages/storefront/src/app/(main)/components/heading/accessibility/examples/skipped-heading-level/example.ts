import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const skippedHeadingLevelA11yExample = {
  name: 'Skipped heading level',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-heading',
          properties: { tag: 'h1', size: 'xl' },
          children: ['Configure your Porsche'],
        },
        {
          tag: 'p-heading',
          properties: { tag: 'h4', size: 'md' },
          children: ['Delivery options'],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-heading',
          properties: { tag: 'h1', size: 'xl' },
          children: ['Configure your Porsche'],
        },
        {
          tag: 'p-heading',
          properties: { tag: 'h2', size: 'md' },
          children: ['Delivery options'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
