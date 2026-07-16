import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const sheetA11yExamples: A11yIntegrationExample[] = [
  {
    title: "ARIA on trigger button host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-button",
          properties: { 'aria-haspopup': "dialog" },
          children: [
            "Filter results"
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
            "Filter results"
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
          tag: "p-sheet",
          properties: { 'aria-label': "Filters" },
          children: [
            "..."
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-sheet",
          children: [
            {
              tag: "p-heading",
              properties: { slot: "header", tag: "h2", size: "lg" },
              children: [
                "Filter results"
              ],
            },
            "..."
          ],
        },
        "// or with aria prop when no visible header is shown",
        {
          tag: "p-sheet",
          properties: { aria: { 'aria-label': "Filter results" } },
          children: [
            "..."
          ],
        },
      ],
    },
  },
  {
    title: "Sheet trigger without popup semantics",
    anti: {
      generator: () => [
        {
          tag: "p-button",
          children: [
            "Open"
          ],
        },
        {
          tag: "p-sheet",
          children: [
            {
              tag: "p-heading",
              properties: { slot: "header", tag: "h2", size: "lg" },
              children: [
                "Filters"
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
            "Filter results"
          ],
        },
        {
          tag: "p-sheet",
          children: [
            {
              tag: "p-heading",
              properties: { slot: "header", tag: "h2", size: "lg" },
              children: [
                "Filter results"
              ],
            },
            "..."
          ],
        },
      ],
    },
  },
];
