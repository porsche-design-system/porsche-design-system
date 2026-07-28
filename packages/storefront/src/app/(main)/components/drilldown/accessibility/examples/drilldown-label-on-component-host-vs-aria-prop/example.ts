import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const drilldownLabelOnComponentHostVsAriaPropA11yExample = {
  name: 'Drilldown label on component host vs aria prop',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-drilldown',
          properties: { open: true, 'aria-label': 'Navigation' },
          children: ['...'],
        },
      ],
    },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-drilldown',
          properties: { open: true, aria: { 'aria-label': 'Vehicle navigation' } },
          children: ['...'],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
