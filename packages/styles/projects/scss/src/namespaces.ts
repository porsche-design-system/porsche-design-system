import { ref } from './ref';

// The `@use` namespace of each cross-referenced partial, declared once and shared by the composition
// layer (`scss/index.ts` `uses`) and the `ref()` calls in src — so a namespace is never re-typed.

const stems = ['border', 'breakpoint', 'color', 'font', 'heading', 'motion'] as const;

/** The `@use` namespace of each cross-referenced partial (identical to its file stem). */
export const namespace = Object.fromEntries(stems.map((stem) => [stem, stem])) as {
  [Stem in (typeof stems)[number]]: Stem;
};

// Pre-bound reference helpers so call sites don't repeat the namespace string.
export const borderRef = ref(namespace.border);
export const colorRef = ref(namespace.color);
export const fontRef = ref(namespace.font);
export const motionRef = ref(namespace.motion);
