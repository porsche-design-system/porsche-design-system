import type { AccessibilityExample } from '@porsche-design-system/story-generator';
import type { ComponentType } from 'react';

/**
 * Structured accessibility metadata for a component. Every documented component uses this shape;
 * components without integration examples use `examples: {}` rather than omitting the field.
 */
export type ComponentAccessibilityMeta = {
  // MDX document owning "Accessibility support" and "Development considerations" content.
  overview: ComponentType;
  // Keyed anti-pattern/recommended example pairs, rendered inline by `A11yIntegrationExamples`.
  examples: Record<string, AccessibilityExample>;
  // MDX document owning automated/manual test-support content.
  tests: ComponentType;
};
