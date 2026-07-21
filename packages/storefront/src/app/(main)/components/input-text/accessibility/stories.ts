import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inputTextA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder used as the only label",
    anti: {
      generator: () => [
        {
          tag: "p-input-text",
          properties: { name: "email", placeholder: "Email" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-text",
          properties: { name: "email", label: "Email address", description: "We use this to send your confirmation." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-input-text",
          properties: { name: "reference", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-text",
          properties: { name: "reference", hideLabel: true, label: "Order reference" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-input-text",
          properties: { name: "email", label: "Email", 'aria-invalid': true, message: "Invalid" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-text",
          properties: { name: "email", label: "Email address", state: "error", message: "Enter a valid email address, for example name@example.com." },
        },
      ],
    },
  },
];
