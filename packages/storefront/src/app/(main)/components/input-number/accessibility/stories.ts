import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inputNumberA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder used as the only label",
    anti: {
      generator: () => [
        {
          tag: "p-input-number",
          properties: { name: "speed", placeholder: "Top speed", unit: "kmh" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-number",
          properties: { name: "speed", label: "Top speed", unit: "kmh", description: "Enter the maximum speed in kilometers per hour." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-input-number",
          properties: { name: "speed", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-number",
          properties: { name: "speed", hideLabel: true, label: "Top speed" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-input-number",
          properties: { name: "speed", label: "Top speed", 'aria-invalid': true, message: "Invalid" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-number",
          properties: { name: "speed", label: "Top speed", unit: "kmh", description: "Enter the maximum speed in kilometers per hour.", state: "error", message: "Enter a speed between 0 and 350 kilometers per hour." },
        },
      ],
    },
  },
];
