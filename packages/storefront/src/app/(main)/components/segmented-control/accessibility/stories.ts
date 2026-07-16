import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const segmentedControlA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Missing group label",
    anti: {
      generator: () => [
        {
          tag: "p-segmented-control",
          properties: { name: "size" },
          children: [
            {
              tag: "p-segmented-control-item",
              properties: { value: "s" },
              children: [
                "S"
              ],
            },
            {
              tag: "p-segmented-control-item",
              properties: { value: "m" },
              children: [
                "M"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-segmented-control",
          properties: { label: "T-shirt size", name: "size", description: "Select your preferred size." },
          children: [
            {
              tag: "p-segmented-control-item",
              properties: { value: "s" },
              children: [
                "S"
              ],
            },
            {
              tag: "p-segmented-control-item",
              properties: { value: "m" },
              children: [
                "M"
              ],
            }
          ],
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-segmented-control",
          properties: { name: "size", hideLabel: true },
          children: [
            {
              tag: "p-segmented-control-item",
              properties: { value: "s" },
              children: [
                "S"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-segmented-control",
          properties: { label: "T-shirt size", name: "size", hideLabel: true },
          children: [
            {
              tag: "p-segmented-control-item",
              properties: { value: "s" },
              children: [
                "S"
              ],
            }
          ],
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-segmented-control",
          properties: { label: "T-shirt size", name: "size", 'aria-invalid': true, message: "Required" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-segmented-control",
          properties: { label: "T-shirt size", name: "size", required: true, state: "error", message: "Select a size to continue." },
        },
      ],
    },
  },
];
