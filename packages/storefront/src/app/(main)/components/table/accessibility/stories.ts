import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const tableA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Data table without caption",
    anti: {
      generator: () => [
        {
          tag: "p-table",
          children: [
            {
              tag: "p-table-head",
              children: [
                "..."
              ],
            },
            {
              tag: "p-table-body",
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
          tag: "p-table",
          properties: { caption: "Available Porsche 911 models and starting prices" },
          children: [
            {
              tag: "p-table-head",
              children: [
                "..."
              ],
            },
            {
              tag: "p-table-body",
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
    title: "Column with hidden label",
    anti: {
      generator: () => [
        {
          tag: "p-table-head-cell",
          properties: { hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-table-head-cell",
          properties: { hideLabel: true },
          children: [
            "Model"
          ],
        },
      ],
    },
  },
];
