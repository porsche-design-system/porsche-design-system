import type { AccessibilityExample } from '@/models/accessibilityMeta';

export const tabbedInterfaceWithoutTablistLabelA11yExample = {
  name: 'Tabbed interface without tablist label',
  antiPattern: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-tabs-bar',
          properties: { activeTabIndex: 0 },
          children: [
            {
              tag: 'button',
              properties: { type: 'button', id: 'tab-0', ariaControls: 'panel-0' },
              children: ['Overview'],
            },
            {
              tag: 'button',
              properties: { type: 'button', id: 'tab-1', ariaControls: 'panel-1' },
              children: ['Equipment'],
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
          tag: 'p-tabs-bar',
          properties: { aria: { 'aria-label': 'Porsche 911 configuration sections' }, activeTabIndex: 0 },
          children: [
            {
              tag: 'button',
              properties: { type: 'button', id: 'tab-0', ariaControls: 'panel-0' },
              children: ['Overview'],
            },
            {
              tag: 'button',
              properties: { type: 'button', id: 'tab-1', ariaControls: 'panel-1' },
              children: ['Equipment'],
            },
          ],
        },
      ],
    },
  },
} satisfies AccessibilityExample;
