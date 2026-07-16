import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const modalA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-button",
          properties: { 'aria-haspopup': "dialog" },
          children: [
            "Details of product XYZ"
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-button",
          properties: { aria: { 'aria-haspopup': "dialog" } },
          children: [
            "Details of product XYZ"
          ],
        },
      ],
    },
  },
  {
    title: "Dialog label on component host vs header slot",
    anti: {
      generator: () => [
        {
          tag: "p-modal",
          properties: { 'aria-label': "Details" },
          children: [
            "..."
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-modal",
          children: [
            {
              tag: "p-heading",
              properties: { slot: "header", tag: "h2", size: "lg" },
              children: [
                "Details of product XYZ"
              ],
            },
            "..."
          ],
        },
        "// or with aria prop when no visible header is shown",
        {
          tag: "p-modal",
          properties: { aria: { 'aria-label': "Details of product XYZ" } },
          children: [
            "..."
          ],
        },
      ],
    },
  },
  {
    title: "Modal trigger without popup semantics or context",
    anti: {
      generator: () => [
        {
          tag: "p-button",
          children: [
            "Open"
          ],
        },
        {
          tag: "p-modal",
          children: [
            {
              tag: "p-heading",
              properties: { slot: "header", tag: "h2", size: "lg" },
              children: [
                "Details"
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
          tag: "p-button",
          properties: { aria: { 'aria-haspopup': "dialog" } },
          children: [
            "Details of product XYZ"
          ],
        },
        {
          tag: "p-modal",
          children: [
            {
              tag: "p-heading",
              properties: { slot: "header", tag: "h2", size: "lg" },
              children: [
                "Details of product XYZ"
              ],
            },
            "..."
          ],
        },
      ],
    },
  },
];
