import type { CodeSample } from '@porsche-design-system/shared';
import type { ComponentType } from 'react';
import type { StoryState } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/** Allows host-level aria-* attributes used in accessibility anti-pattern examples. */
export type A11yHostAttributes = {
  [Attribute in `aria-${string}`]?: string | boolean;
} & {
  role?: string;
};

/**
 * A standalone comment node. Snippets teach by contrast and often need a short aside — an elided
 * region, or an alternative to the recommendation above it. Authored once as plain text and emitted
 * in the comment syntax of whichever framework the snippet is rendered for.
 */
export type A11yComment = { comment: string };

/** Anything an `AccessibilityStory` generator may return, at top level or as a child. */
export type A11yNode = string | A11yComment | A11yElementConfig<HTMLTagOrComponent> | undefined;

/**
 * Widens a normal `ElementConfig` so `AccessibilityStory` generators can represent intentional
 * anti-pattern markup: host-level `aria-*` / `role` attributes in `properties`, and comment nodes
 * among `children`. This widening must stay isolated to accessibility payloads.
 */
export type A11yElementConfig<T extends HTMLTagOrComponent> = Omit<ElementConfig<T>, 'properties' | 'children'> & {
  properties?: ElementConfig<T>['properties'] & A11yHostAttributes & Record<string, unknown>;
  children?: A11yNode[];
};

/**
 * Story whose markup is generated at render time through the shared framework-markup pipeline.
 * Follows the normal `Story` generator contract but returns the widened `A11yNode` (see
 * `A11yElementConfig`), so intentional anti-patterns and snippet comments are representable. This
 * widening must stay isolated to accessibility payloads and must not leak into normal stories.
 */
export type AccessibilityStory = {
  state?: StoryState<HTMLTagOrComponent>;
  generator: (state?: StoryState<HTMLTagOrComponent>) => A11yNode[];
};

/**
 * The markup-only subset of `CodeSample`. Accessibility examples render as static snippets and never
 * mount a live preview, so an authored payload owes only its per-framework markup — a full
 * `CodeSample` stays assignable.
 */
export type ExampleMarkupSample = Pick<CodeSample, 'frameworkMarkup'>;

/**
 * Discriminated union of the two payload kinds for an accessibility example side (anti-pattern or
 * recommended). Mirrors the normal example `ExampleMeta` payload split:
 *  - `kind: 'story'`   → resolved through the shared framework-markup pipeline.
 *  - `kind: 'example'` → resolved from a manually authored cross-framework markup sample, reserved
 *    for imperative code that cannot be represented declaratively.
 */
export type ExamplePayload<StoryType = AccessibilityStory> =
  | { kind: 'story'; story: StoryType }
  | { kind: 'example'; example: ExampleMarkupSample };

/** A single named accessibility example pair (anti-pattern vs recommended). */
export type AccessibilityExample = {
  name: string;
  antiPattern: ExamplePayload<AccessibilityStory>;
  recommended: ExamplePayload<AccessibilityStory>;
};

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
