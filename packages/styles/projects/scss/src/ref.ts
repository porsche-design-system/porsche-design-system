// The scss analog of the tailwindcss `prefix()` helper: reference a source object instead of
// hardcoding its `namespace.$name` string, so a rename can't silently break a cross-reference.

/** A node addressable by name from another partial — a variable (`$`-prefixed name) or a mixin. */
type Referenceable = { name: string };

/** Builds a namespaced Sass reference like `color.$color-focus`. `namespace` is the target partial's `@use` name. */
export const ref =
  (namespace: string) =>
  (node: Referenceable): string =>
    `${namespace}.${node.name}`;
