import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const iconA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Meaningful icon without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-icon",
          properties: { name: "warning" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-icon",
          properties: { name: "warning", aria: { 'aria-label': "Warning" } },
        },
      ],
    },
  },
  {
    title: "Decorative icon with redundant label",
    anti: {
      generator: () => [
        {
          tag: "p-icon",
          properties: { name: "phone", aria: { 'aria-label': "Phone" } },
        },
        {
          tag: "p-text",
          children: [
            "+49 711 911 0"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-icon",
          properties: { ariaHidden: true, name: "phone" },
        },
        {
          tag: "p-text",
          children: [
            "+49 711 911 0"
          ],
        },
      ],
    },
  },
];
