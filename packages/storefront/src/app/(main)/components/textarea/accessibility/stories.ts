import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const textareaA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Placeholder-only instructions for open text input",
    anti: {
      generator: () => [
        {
          tag: "p-textarea",
          properties: { name: "feedback", placeholder: "Tell us what you think" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-textarea",
          properties: { name: "feedback", label: "Your feedback", description: "Describe what worked well and what we should improve (min. 20 characters)." },
        },
      ],
    },
  },
  {
    title: "Hidden label without accessible name",
    anti: {
      generator: () => [
        {
          tag: "p-textarea",
          properties: { name: "feedback", hideLabel: true },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-textarea",
          properties: { name: "feedback", hideLabel: true, label: "Your feedback" },
        },
      ],
    },
  },
  {
    title: "Validation feedback via state and message API",
    anti: {
      generator: () => [
        {
          tag: "p-textarea",
          properties: { name: "feedback", label: "Your feedback", 'aria-invalid': true, message: "Too short" },
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-textarea",
          properties: { name: "feedback", label: "Your feedback", state: "error", message: "Enter at least 20 characters so we can understand your feedback." },
        },
      ],
    },
  },
];
