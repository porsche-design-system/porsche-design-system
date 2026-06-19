import { ref } from './ref';

// The `@use` namespace of each cross-referenced partial, declared once and shared by the composition
// layer (`scss/index.ts` `uses`) and the `ref()` calls in src — so a namespace is never re-typed.

/** The `@use` namespace of each cross-referenced partial. */
export const namespace = {
  border: 'border',
  breakpoint: 'breakpoint',
  color: 'color',
  font: 'font',
  heading: 'heading',
  motion: 'motion',
} as const;

// Pre-bound reference helpers so call sites don't repeat the namespace string.
export const borderRef = ref(namespace.border);
export const colorRef = ref(namespace.color);
export const fontRef = ref(namespace.font);
export const motionRef = ref(namespace.motion);
