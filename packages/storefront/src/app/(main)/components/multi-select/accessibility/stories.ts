import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const multiSelectA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Prompt option used instead of a label",
    anti: {
      generator: () => [
        {
          tag: "p-multi-select",
          properties: { name: "features" },
          children: [
            {
              tag: "p-multi-select-option",
              properties: { value: "" },
              children: [
                "Select features"
              ],
            },
            {
              tag: "p-multi-select-option",
              properties: { value: "sport" },
              children: [
                "Sport Chrono Package"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-multi-select",
          properties: { label: "Optional features", name: "features", description: "Select all features for your configuration." },
          children: [
            {
              tag: "p-multi-select-option",
              properties: { value: "sport" },
              children: [
                "Sport Chrono Package"
              ],
            },
            {
              tag: "p-multi-select-option",
              properties: { value: "audio" },
              children: [
                "BOSE Surround Sound"
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
          tag: "p-multi-select",
          properties: { name: "features", hideLabel: true },
          children: [
            {
              tag: "p-multi-select-option",
              properties: { value: "sport" },
              children: [
                "Sport Chrono Package"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-multi-select",
          properties: { label: "Optional features", name: "features", hideLabel: true },
          children: [
            {
              tag: "p-multi-select-option",
              properties: { value: "sport" },
              children: [
                "Sport Chrono Package"
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
          tag: "p-multi-select",
          properties: { label: "Optional features", name: "features", 'aria-invalid': true, message: "Required" },
          children: [
            {
              tag: "p-multi-select-option",
              properties: { value: "sport" },
              children: [
                "Sport Chrono Package"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-multi-select",
          properties: { label: "Optional features", name: "features", required: true, state: "error", message: "Select at least one feature to continue." },
          children: [
            {
              tag: "p-multi-select-option",
              properties: { value: "sport" },
              children: [
                "Sport Chrono Package"
              ],
            },
            {
              tag: "p-multi-select-option",
              properties: { value: "audio" },
              children: [
                "BOSE Surround Sound"
              ],
            }
          ],
        },
      ],
    },
  },
];
