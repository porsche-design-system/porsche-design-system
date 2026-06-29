import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inputPasswordA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder used as the only label",
    anti: {
      generator: () => [
        {
          tag: "p-input-password",
          properties: { name: "password", placeholder: "Password" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-password",
          properties: { name: "password", label: "Password", description: "Use at least 8 characters with one number." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-input-password",
          properties: { name: "password", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-password",
          properties: { name: "password", hideLabel: true, label: "Password" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-input-password",
          properties: { name: "password", label: "Password", 'aria-invalid': true, message: "Invalid" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-password",
          properties: { name: "password", label: "Password", state: "error", message: "Enter a password with at least 8 characters and one number." },
        },
      ],
    },
  },
];
