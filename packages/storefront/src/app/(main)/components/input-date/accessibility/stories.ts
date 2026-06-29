import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inputDateA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder used as the only label",
    anti: {
      generator: () => [
        {
          tag: "p-input-date",
          properties: { name: "birthdate", placeholder: "Date of birth" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-date",
          properties: { name: "birthdate", label: "Date of birth", description: "Enter day, month, and year." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-input-date",
          properties: { name: "birthdate", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-date",
          properties: { name: "birthdate", hideLabel: true, label: "Date of birth" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-input-date",
          properties: { name: "birthdate", label: "Date of birth", 'aria-invalid': true, message: "Invalid" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-date",
          properties: { name: "birthdate", label: "Date of birth", state: "error", message: "Enter a valid date of birth." },
        },
      ],
    },
  },
];
