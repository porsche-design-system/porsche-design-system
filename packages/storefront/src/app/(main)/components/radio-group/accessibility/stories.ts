import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const radioGroupA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Missing group label",
    anti: {
      generator: () => [
        {
          tag: "p-radio-group",
          properties: { name: "fuel" },
          children: [
            {
              tag: "p-radio-group-option",
              properties: { value: "electric", label: "Electric" },
            },
            {
              tag: "p-radio-group-option",
              properties: { value: "hybrid", label: "Hybrid" },
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-radio-group",
          properties: { label: "Powertrain", name: "fuel", description: "Select your preferred powertrain." },
          children: [
            {
              tag: "p-radio-group-option",
              properties: { value: "electric", label: "Electric" },
            },
            {
              tag: "p-radio-group-option",
              properties: { value: "hybrid", label: "Hybrid" },
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
          tag: "p-radio-group",
          properties: { name: "fuel", hideLabel: true },
          children: [
            {
              tag: "p-radio-group-option",
              properties: { value: "electric", label: "Electric" },
            },
            {
              tag: "p-radio-group-option",
              properties: { value: "hybrid", label: "Hybrid" },
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-radio-group",
          properties: { label: "Powertrain", name: "fuel", hideLabel: true },
          children: [
            {
              tag: "p-radio-group-option",
              properties: { value: "electric", label: "Electric" },
            },
            {
              tag: "p-radio-group-option",
              properties: { value: "hybrid", label: "Hybrid" },
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
          tag: "p-radio-group",
          properties: { label: "Powertrain", name: "fuel", 'aria-invalid': true, message: "Required" },
          children: [
            {
              tag: "p-radio-group-option",
              properties: { value: "electric", label: "Electric" },
            },
            {
              tag: "p-radio-group-option",
              properties: { value: "hybrid", label: "Hybrid" },
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-radio-group",
          properties: { label: "Powertrain", name: "fuel", required: true, state: "error", message: "Select a powertrain to continue." },
          children: [
            {
              tag: "p-radio-group-option",
              properties: { value: "electric", label: "Electric" },
            },
            {
              tag: "p-radio-group-option",
              properties: { value: "hybrid", label: "Hybrid" },
            }
          ],
        },
      ],
    },
  },
];
