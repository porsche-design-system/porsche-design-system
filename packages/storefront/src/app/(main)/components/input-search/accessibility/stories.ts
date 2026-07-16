import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const inputSearchA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder used as the only label",
    anti: {
      generator: () => [
        {
          tag: "p-input-search",
          properties: { name: "search", placeholder: "Search" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-search",
          properties: { name: "search", label: "Search vehicles", description: "Search by model name or VIN." },
        },
      ],
    },
  },
  {
    title: "ARIA on component host vs aria prop",
    anti: {
      generator: () => [
        {
          tag: "p-input-search",
          properties: { name: "search", label: "Search vehicles", role: "combobox", 'aria-expanded': false, 'aria-haspopup': "listbox" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-search",
          properties: { name: "search", label: "Search vehicles", aria: { 'role': "combobox", 'aria-expanded': "false", 'aria-haspopup': "listbox" } },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-input-search",
          properties: { name: "search", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-search",
          properties: { name: "search", hideLabel: true, label: "Search vehicles" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-input-search",
          properties: { name: "search", label: "Search vehicles", 'aria-invalid': true, message: "Invalid" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-input-search",
          properties: { name: "search", label: "Search vehicles", state: "error", message: "Enter at least 3 characters to search." },
        },
      ],
    },
  },
];
