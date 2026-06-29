import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inputUrlA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder used as the only label",
    anti: {
      generator: () => [
        {
          tag: "p-input-url",
          properties: { name: "website", placeholder: "https://" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-url",
          properties: { name: "website", label: "Website URL", description: "Include https:// at the beginning." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-input-url",
          properties: { name: "website", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-url",
          properties: { name: "website", hideLabel: true, label: "Website URL" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-input-url",
          properties: { name: "website", label: "Website URL", 'aria-invalid': true, message: "Invalid" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-url",
          properties: { name: "website", label: "Website URL", state: "error", message: "Enter a valid URL, for example https://www.porsche.com." },
        },
      ],
    },
  },
];
