// Meta types describing the global styles. This package is intentionally the single
// source of truth for the global styles and is NOT derived from the design tokens,
// since the set of exposed CSS variables is not guaranteed to map 1:1 to tokens.

/** The CSS custom property type. */
export type CssVariableType = 'color' | 'typography' | 'spacing' | 'radius' | 'blur' | 'shadow' | 'motion';

/**
 * A single CSS custom property (CSS variable) exposed by the global styles.
 *
 * A variable leaf is structurally a {@link CssDeclaration} (`property` + `value`)
 * enriched with documentation metadata, so it can be emitted into CSS directly
 * (via the `renderCss` helper) without an intermediate transform.
 *
 * This is a discriminated union on `type`:
 * - `type: 'color'` variables are theme-aware: they are resolved via `light-dark()`
 *   in `:root` and additionally carry explicit `valueLight` / `valueDark` values used
 *   by the `@supports not (color: light-dark(...))` polyfill.
 * - all other `type`s are theme-agnostic and therefore must NOT carry light/dark values.
 */
export type CssVariableMeta = CssVariableMetaBase &
  (
    | {
        /** Discriminant: marks this variable as a theme-aware color. */
        type: 'color';
        /** Color-only: explicit light value used by the `light-dark()` polyfill. */
        valueLight: string;
        /** Color-only: explicit dark value used by the `light-dark()` polyfill. */
        valueDark: string;
      }
    // Non-color variables are theme-agnostic and cannot carry light/dark values.
    | { type: Exclude<CssVariableType, 'color'> }
  );

/** Properties shared by every CSS variable, regardless of its `type`. */
type CssVariableMetaBase = CssDeclaration & {
  /** Short, human-readable name within its group, e.g. `canvas`. */
  name: string;
  /** Markdown-enabled description (supports `**bold**` and `` `code` ``). */
  description: string;
  /** The category this variable belongs to; also acts as the union discriminant. */
  type: CssVariableType;
};

/** A theme-aware color variable (`type: 'color'`) carrying explicit light/dark values. */
export type ColorCssVariableMeta = Extract<CssVariableMeta, { type: 'color' }>;

/** Recursive tree of grouped CSS variables (`color.background.canvas`, …). */
export type CssVariablesMetaTree = { [key: string]: CssVariablesMetaTree | CssVariableMeta };

/**
 * A `.scheme-*` utility class controlling the CSS `color-scheme` property.
 *
 * A color-scheme class is structurally a {@link CssRule} (`selector` +
 * `declarations`) enriched with documentation metadata, so it can be emitted
 * into CSS directly (via the `renderCss` helper) without an intermediate
 * transform.
 */
export type ColorSchemeClassMeta = CssRule & {
  /** Example usage snippet. */
  usage: string;
  /** Markdown-enabled description. */
  description: string;
};

// ---------------------------------------------------------------------------
// CSS resolution model
//
// The meta not only describes *what* the global styles expose, but also *how*
// each part is resolved into a concrete CSS file. That resolution is expressed
// as a tree of `CssNode`s (declarations and nested rules) which the generic
// `renderCss` helper serializes. This keeps the knowledge of the generated CSS
// structure inside the meta (the single source of truth) instead of scattered
// across the build scripts.
// ---------------------------------------------------------------------------

/** A single CSS declaration, e.g. `color-scheme: dark` or `--p-color-canvas: #fff`. */
export type CssDeclaration = {
  /** The CSS property or custom property, e.g. `color-scheme` or `--p-color-canvas`. */
  property: string;
  /** The declaration value, e.g. `dark` or `light-dark(#fff, #000)`. */
  value: string | number;
};

/**
 * A CSS rule or at-rule. `declarations` may contain plain declarations and/or
 * nested rules (for at-rules like `@supports` / `@media`), which is how the
 * meta gives away the exact structure of the generated CSS file.
 */
export type CssRule = {
  /** Optional leading comment rendered above the rule, e.g. `Simplified Chinese`. */
  comment?: string;
  /** The selector or at-rule prelude, e.g. `:root`, `.scheme-dark`, `@supports …`. */
  selector: string;
  /** Declarations and/or nested rules belonging to this rule. */
  declarations: CssNode[];
};

/** Either a plain declaration or a (possibly nested) rule. */
export type CssNode = CssRule | CssDeclaration;

export type GlobalStyleMeta = {
  file: string;
  description: string;
  meta: CssNode[];
};

/** The complete meta describing every part of the global styles. */
export type GlobalStylesMeta = { [key: string]: GlobalStyleMeta };
