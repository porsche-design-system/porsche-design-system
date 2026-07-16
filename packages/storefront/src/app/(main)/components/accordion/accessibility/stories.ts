import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const accordionA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Accordion summary without semantic heading",
    anti: {
      generator: () => [
        {
          tag: "p-accordion",
          children: [
            {
              tag: "span",
              properties: { slot: "summary" },
              children: [
                "Delivery options"
              ],
            },
            {
              tag: "p-text",
              children: [
                "Content about delivery."
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-accordion",
          children: [
            {
              tag: "p-heading",
              properties: { slot: "summary", tag: "h2", size: "sm" },
              children: [
                "Delivery options"
              ],
            },
            {
              tag: "p-text",
              children: [
                "Content about delivery."
              ],
            }
          ],
        },
      ],
    },
  },
  {
    title: "Skipped heading level",
    anti: {
      generator: () => [
        {
          tag: "p-heading",
          properties: { tag: "h1" },
          children: [
            "Configure your Porsche"
          ],
        },
        {
          tag: "p-accordion",
          children: [
            {
              tag: "p-heading",
              properties: { slot: "summary", tag: "h4", size: "sm" },
              children: [
                "Delivery options"
              ],
            },
            "..."
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-heading",
          properties: { tag: "h1" },
          children: [
            "Configure your Porsche"
          ],
        },
        {
          tag: "p-accordion",
          children: [
            {
              tag: "p-heading",
              properties: { slot: "summary", tag: "h2", size: "sm" },
              children: [
                "Delivery options"
              ],
            },
            "..."
          ],
        },
      ],
    },
  },
];
