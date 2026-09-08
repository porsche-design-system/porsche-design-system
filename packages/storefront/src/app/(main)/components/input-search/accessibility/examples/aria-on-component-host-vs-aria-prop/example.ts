import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const ariaOnComponentHostVsAriaPropA11yExample = {
  name: 'ARIA on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-search',
          properties: {
            name: 'search',
            label: 'Search vehicles',
            role: 'combobox',
            'aria-expanded': false,
            'aria-haspopup': 'listbox',
          },
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-input-search',
          properties: {
            name: 'search',
            label: 'Search vehicles',
            aria: { role: 'combobox', 'aria-expanded': 'false', 'aria-haspopup': 'listbox' },
          },
        },
      ],
    },
  },
} satisfies AccessibilityExample;
