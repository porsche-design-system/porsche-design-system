import type { ExampleId } from '@porsche-design-system/examples';
import type { HTMLTagOrComponent } from '@porsche-design-system/story-generator';
import type { ComponentType } from 'react';
import type { ComponentExamplesPath } from '@/models/meta';

/**
 * Structured accessibility metadata for a component. Every documented component uses this shape;
 * components without integration examples use `examples: []` rather than omitting the field.
 */
export type ComponentAccessibilityMeta<Tag extends HTMLTagOrComponent = HTMLTagOrComponent> = {
  // MDX document owning "Accessibility support" and "Development considerations" content.
  overview: ComponentType;
  // Anti-pattern/recommended example pairs by id, in their order, rendered inline by `A11yIntegrationExamples`.
  examples: Extract<ExampleId, `${ComponentExamplesPath<Tag>}/accessibility/${string}`>[];
  // MDX document owning automated/manual test-support content.
  tests: ComponentType;
};
