// Meta types describing the global styles. This package is intentionally the single
// source of truth for the global styles and is NOT derived from the design tokens,
// since the set of exposed CSS variables is not guaranteed to map 1:1 to tokens.
//
// The documented catalog (`stylesheetsMeta`) is a domain-keyed tree whose leaves are a
// discriminated `StylesheetNode` union: a `CssVariableMeta` token (carries `property`) or a
// `ColorSchemeClassMeta` utility (carries `selector`). The leaf's kind (`token` | `utility`)
// is recoverable via `kindOf`, mirroring the scss/tailwind meta model.

/** The CSS custom property category; also acts as the color discriminant. */
export type CssVariableType = 'color' | 'font' | 'spacing' | 'border' | 'blur' | 'shadow' | 'motion';

/**
 * A single CSS custom property (CSS variable) exposed by the global styles — a documented
 * **token**.
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
  /** Markdown-enabled description (supports `**bold**` and `` `code` ``). */
  description: string;
  /** The category this variable belongs to; also acts as the union discriminant. */
  type: CssVariableType;
};

/** A theme-aware color variable (`type: 'color'`) carrying explicit light/dark values. */
export type ColorCssVariableMeta = Extract<CssVariableMeta, { type: 'color' }>;

/**
 * A `.scheme-*` utility class controlling the CSS `color-scheme` property — a documented
 * **utility**.
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

/**
 * A documented leaf of the meta catalog: either a CSS variable {@link CssVariableMeta} token
 * or a `.scheme-*` {@link ColorSchemeClassMeta} utility. Discriminated structurally — a token
 * carries `property`, a utility carries `selector` — which `kindOf` uses to recover the kind.
 */
export type StylesheetNode = CssVariableMeta | ColorSchemeClassMeta;

/** Recursive tree of grouped CSS variable tokens (`color.background.canvas`, …). */
export type StylesheetTokenTree = { [key: string]: StylesheetTokenTree | CssVariableMeta };

/**
 * The precise per-domain shape of the documented CSS variable tokens. Domain order mirrors the
 * emitted `variables.css` declaration order (kept stable for byte-identical output); the
 * vocabulary (`font`, `border.radius`, `motion.ease`, `font.size`) mirrors the scss meta model.
 */
export type CssVariableTokens = {
  color: {
    background: Record<string, ColorCssVariableMeta>;
    foreground: Record<string, ColorCssVariableMeta>;
    semantic: Record<string, ColorCssVariableMeta>;
    a11y: Record<string, ColorCssVariableMeta>;
  };
  font: {
    family: Record<string, CssVariableMeta>;
    weight: Record<string, CssVariableMeta>;
    lineHeight: Record<string, CssVariableMeta>;
    size: Record<string, CssVariableMeta>;
  };
  spacing: {
    fluid: Record<string, CssVariableMeta>;
    static: Record<string, CssVariableMeta>;
  };
  border: {
    radius: Record<string, CssVariableMeta>;
  };
  blur: Record<string, CssVariableMeta>;
  shadow: Record<string, CssVariableMeta>;
  motion: {
    duration: Record<string, CssVariableMeta>;
    ease: Record<string, CssVariableMeta>;
  };
};

/**
 * The documented single source of truth, shared with the storefront docs and (future) LLM skill.
 * A domain-keyed catalog whose leaves are a discriminated {@link StylesheetNode} union; each
 * leaf's kind (`token` | `utility`) is recoverable via `kindOf`. CSS variables are tokens; the
 * `.scheme-*` classes are utilities. The `normalize` reset has no documented leaves and therefore
 * lives only in the composition layer (`css/index.ts`), not in this catalog.
 */
export type StylesheetsMeta = CssVariableTokens & {
  colorScheme: ColorSchemeClassMeta[];
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

/** The complete per-file composition describing every generated global stylesheet. */
export type GlobalStylesMeta = { [key: string]: GlobalStyleMeta };
