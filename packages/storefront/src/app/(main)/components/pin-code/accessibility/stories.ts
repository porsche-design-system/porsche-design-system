import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const pinCodeA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Missing field label",
    anti: {
      generator: () => [
        {
          tag: "p-pin-code",
          properties: { name: "verification", length: 6 },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-pin-code",
          properties: { name: "verification", length: 6, label: "Verification code", description: "Enter the 6-digit code from your email." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-pin-code",
          properties: { name: "verification", length: 6, hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-pin-code",
          properties: { name: "verification", length: 6, hideLabel: true, label: "Verification code" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-pin-code",
          properties: { name: "verification", label: "Verification code", 'aria-invalid': true, message: "Invalid" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-pin-code",
          properties: { name: "verification", length: 6, label: "Verification code", state: "error", message: "Enter the complete 6-digit verification code." },
        },
      ],
    },
  },
];
