import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inputWeekA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder used as the only label",
    anti: {
      generator: () => [
        {
          tag: "p-input-week",
          properties: { name: "week", placeholder: "Week" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-week",
          properties: { name: "week", label: "Calendar week", description: "Select the week for your test drive." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-input-week",
          properties: { name: "week", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-week",
          properties: { name: "week", hideLabel: true, label: "Calendar week" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-input-week",
          properties: { name: "week", label: "Calendar week", 'aria-invalid': true, message: "Required" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-week",
          properties: { name: "week", label: "Calendar week", state: "error", message: "Select a calendar week to continue." },
        },
      ],
    },
  },
];
