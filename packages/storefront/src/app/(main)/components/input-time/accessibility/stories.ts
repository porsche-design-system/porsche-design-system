import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inputTimeA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder used as the only label",
    anti: {
      generator: () => [
        {
          tag: "p-input-time",
          properties: { name: "time", placeholder: "Time" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-time",
          properties: { name: "time", label: "Appointment time", description: "Use 24-hour format, for example 14:30." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-input-time",
          properties: { name: "time", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-time",
          properties: { name: "time", hideLabel: true, label: "Appointment time" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-input-time",
          properties: { name: "time", label: "Appointment time", 'aria-invalid': true, message: "Invalid" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-time",
          properties: { name: "time", label: "Appointment time", state: "error", message: "Enter a valid appointment time." },
        },
      ],
    },
  },
];
