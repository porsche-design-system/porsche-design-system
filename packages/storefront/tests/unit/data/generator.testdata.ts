import type { Story } from '@/models/story';
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
        tag: 'div',
        properties: { slot: 'footer', role: 'group', className: 'flex flex-wrap gap-fluid-sm max-xs:flex-col' },
        children: [
          { tag: 'p-button', properties: { type: 'button' }, children: ['Proceed'] },
          { tag: 'p-button', properties: { type: 'button', variant: 'secondary' }, children: ['Cancel'] },
        ],
      },

      { tag: 'p-text', properties: { slot: 'sub-footer' }, children: ['Some additional Sub-Footer'] },
    ],
  },
];

export const carouselTestConfig: [ElementConfig<'p-carousel'>, ElementConfig<'style'>] = [
  {
    tag: 'p-carousel',
    properties: {
      heading: 'Some heading',
      intl: {
        slideLabel: 'Slide %s von %s',
        prev: 'Vorheriger Slide',
        next: 'Nächster Slide',
        first: 'Zum ersten Slide',
        last: 'Zum letzten Slide',
      },
    },
    children: [
      { tag: 'div', properties: { className: 'slide' }, children: ['Slide 1'] },
      { tag: 'div', properties: { className: 'slide' }, children: ['Slide 2'] },
      { tag: 'div', properties: { className: 'slide' }, children: ['Slide 3'] },
    ],
  },
  {
    tag: 'style',
    children: [
      `.slide {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #00b0f4;
    height: 150px;
    color: #010205;
  }`,
    ],
  },
];
