import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inputMonthA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder used as the only label",
    anti: {
      generator: () => [
        {
          tag: "p-input-month",
          properties: { name: "month", placeholder: "Month" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-month",
          properties: { name: "month", label: "Delivery month", description: "Select the month for your delivery." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-input-month",
          properties: { name: "month", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-month",
          properties: { name: "month", hideLabel: true, label: "Delivery month" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-input-month",
          properties: { name: "month", label: "Delivery month", 'aria-invalid': true, message: "Required" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-month",
          properties: { name: "month", label: "Delivery month", state: "error", message: "Select a delivery month to continue." },
        },
      ],
    },
  },
];
