'use client';

import type { Story } from '@/models/story';

export const statementStory: Story<'p-heading'> = {
  generator: () => [
    {
      tag: 'p-heading',
      properties: { size: 'large' },
      children: [{ tag: 'h1', children: ['Accessibility Statement'] }],
    },
    {
      tag: 'p-text',
      children: [
        {
          tag: 'p-text',
          children: [
            'We are committed to ensuring digital accessibility for people with disabilities.',
            {
              tag: 'br',
            },
            'We are continually improving the user experience for everyone, and applying the relevant accessibility standards.',
          ],
        },
      ],
    },
    {
      tag: 'p-heading',
      properties: {
        size: 'medium',
      },
      children: [
        {
          tag: 'h2',
          children: ['Measures to support accessibility [optional - choose from list]'],
        },
      ],
    },
    {
      tag: 'p-text',
      children: ['We take the following measures to ensure accessibility of this Website:'],
    },
    {
      tag: 'p-text-list',
      children: [
        {
          tag: 'p-text-list-item',
          children: ['Include accessibility as part of our mission statement.'],
        },
        {
          tag: 'p-text-list-item',
          children: ['Integrate accessibility into our procurement practices.'],
        },
        {
          tag: 'p-text-list-item',
          children: ['Appoint an accessibility officer and/or ombudsperson.'],
        },
        {
          tag: 'p-text-list-item',
          children: ['Provide continual accessibility training for our staff.'],
        },
        {
          tag: 'p-text-list-item',
          children: ['Include people with disabilities in our design personas.'],
        },
        {
          tag: 'p-text-list-item',
          children: ['Include automatic and manual testing strategies.'],
        },
      ],
    },
    {
      tag: 'p-heading',
      properties: { size: 'medium' },
      children: [{ tag: 'h2', children: ['Conformance status'] }],
    },
    {
      tag: 'p-text',
      children: [
        'The ',
        {
          tag: 'a',
          properties: { href: 'https://w3.org/WAI/standards-guidelines/wcag' },
          children: ['Web Content Accessibility Guidelines (WCAG)'],
        },
        ' defines requirements for designers and developers to improve accessibility for people with disabilities.',
      ],
    },
    {
      tag: 'p-text',
      children: [
        'Porsche is committed to making its websites usable by all people by meeting or exceeding the requirements of the Web Content Accessibility Guidelines 2.1 Level AA (the Guidelines). We continually assess and work to ensure that our Web presence is in conformance with the Guidelines.',
      ],
    },
    {
      tag: 'p-text',
      children: [
        'Please be aware that our efforts are ongoing as our current website provider implements the relevant improvements to meet the Guidelines over time.',
      ],
    },
    {
      tag: 'p-heading',
      properties: { size: 'medium' },
      children: [{ tag: 'h2', children: ['Feedback'] }],
    },
    {
      tag: 'p-text',
      children: [
        'If you experience any difficulty in accessing any part of this website, please feel free to contact us. Please be sure to specify the Web page and describe the issue in detail and we will make reasonable efforts to make that page accessible. We welcome feedback on how we can improve as well.',
      ],
    },
    {
      tag: 'p-text-list',
      children: [
        {
          tag: 'p-text-list-item',
          children: [
            'E-mail: ',
            {
              tag: 'a',
              properties: { href: 'mailto:[e-mail address]' },
              children: ['[e-mail address]'],
            },
          ],
        },
        {
          tag: 'p-text-list-item',
          children: [
            'Postal address:',
            {
              tag: 'br',
            },
            'Dr. Ing. h.c. F. Porsche AG',
            {
              tag: 'br',
            },
            'Porscheplatz 1',
            {
              tag: 'br',
            },
            'D-70435 Stuttgart',
          ],
        },
      ],
    },
  ],
};
