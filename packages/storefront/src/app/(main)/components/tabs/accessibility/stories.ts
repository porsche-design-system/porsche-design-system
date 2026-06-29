import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const tabsA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-tabs",
          properties: { 'aria-label': "Product details" },
          children: [
            {
              tag: "p-tabs-item",
              properties: { label: "Overview" },
              children: [
                "..."
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-tabs",
          properties: { aria: { 'aria-label': "Porsche 911 configuration details" } },
          children: [
            {
              tag: "p-tabs-item",
              properties: { label: "Overview" },
              children: [
                "..."
              ],
            },
            {
              tag: "p-tabs-item",
              properties: { label: "Equipment" },
              children: [
                "..."
              ],
            }
          ],
        },
      ],
    },
  },
  {
    title: "Vague tab labels without context",
    anti: {
      generator: () => [
        {
          tag: "p-tabs",
          properties: { aria: { 'aria-label': "Product details" } },
          children: [
            {
              tag: "p-tabs-item",
              properties: { label: "Details" },
              children: [
                "..."
              ],
            },
            {
              tag: "p-tabs-item",
              properties: { label: "More" },
              children: [
                "..."
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-tabs",
          properties: { aria: { 'aria-label': "Porsche 911 configuration details" } },
          children: [
            {
              tag: "p-tabs-item",
              properties: { label: "Overview" },
              children: [
                "..."
              ],
            },
            {
              tag: "p-tabs-item",
              properties: { label: "Equipment and packages" },
              children: [
                "..."
              ],
            }
          ],
        },
      ],
    },
  },
];
