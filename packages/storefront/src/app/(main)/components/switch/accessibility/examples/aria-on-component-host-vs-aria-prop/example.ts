import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-switch',
          properties: { 'aria-label': 'Dark mode', 'aria-description': 'Toggles the color theme' },
          children: ['Dark mode'],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-switch',
          properties: { aria: { 'aria-label': 'Dark mode', 'aria-description': 'Toggles the color theme' } },
          children: ['Dark mode'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
