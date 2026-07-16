import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inputTelA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder used as the only label",
    anti: {
      generator: () => [
        {
          tag: "p-input-tel",
          properties: { name: "phone", placeholder: "Phone" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-tel",
          properties: { name: "phone", label: "Phone number", description: "Include your country code, for example +49." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-input-tel",
          properties: { name: "phone", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-tel",
          properties: { name: "phone", hideLabel: true, label: "Phone number" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-input-tel",
          properties: { name: "phone", label: "Phone number", 'aria-invalid': true, message: "Invalid" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-tel",
          properties: { name: "phone", label: "Phone number", state: "error", message: "Enter a valid phone number including your country code." },
        },
      ],
    },
  },
];
