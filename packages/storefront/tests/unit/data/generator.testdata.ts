import type { ElementConfig } from '@/utils/generator/generator';

export const buttonTestConfig: [ElementConfig<'p-button'>, ElementConfig<'p-banner'>] = [
  {
    tag: 'p-button',
    properties: {
      aria: { 'aria-haspopup': true, 'aria-label': 'Some more descriptive label' },
      type: 'button',
      compact: true,
      icon: 'add',
    },
    events: {
      onClick: {
        target: 'p-banner',
        prop: 'open',
        value: true,
      },
    },
    children: ['Open Banner'],
  },
  {
    tag: 'p-banner',
    properties: { open: false, dismissButton: false, heading: 'Some heading', headingTag: 'h4', state: 'warning' },
    events: {
      onDismiss: {
        target: 'p-banner',
        prop: 'open',
        value: false,
      },
    },
  },
];

export const flyoutTestConfig: [ElementConfig<'p-button'>, ElementConfig<'p-flyout'>] = [
  {
    tag: 'p-button',
    properties: {
      type: 'button',
      aria: { 'aria-haspopup': 'dialog' },
    },
    events: {
      onClick: {
        target: 'p-flyout',
        prop: 'open',
        value: true,
      },
    },
    children: ['Open Flyout'],
  },
  {
    tag: 'p-flyout',
    properties: { open: false, aria: { 'aria-label': 'Some Heading' } },
    events: {
      onDismiss: {
        target: 'p-flyout',
        prop: 'open',
        value: false,
      },
    },
    children: [
      {
        tag: 'p-heading',
        properties: { slot: 'header', size: 'large', tag: 'h2' },
        children: ['Some Heading'],
      },

      { tag: 'p-text', children: ['Some Content Begin'] },
      { tag: 'div', properties: { style: { width: '10px', height: '120vh', background: 'deeppink' } } },
      { tag: 'p-text', children: ['Some Content End'] },

      {
        tag: 'p-button-group',
        properties: { slot: 'footer' },
        children: [
          { tag: 'p-button', properties: { type: 'button' }, children: ['Proceed'] },
          { tag: 'p-button', properties: { type: 'button', variant: 'secondary' }, children: ['Cancel'] },
        ],
      },

      { tag: 'p-text', properties: { slot: 'sub-footer' }, children: ['Some additional Sub-Footer'] },
    ],
  },
];
