/** A single CSS declaration, e.g. `color-scheme: dark` or `--p-color-canvas: #fff`. */
export type CssDeclaration = {
  /** The CSS property or custom property, e.g. `color-scheme` or `--p-color-canvas`. */
  property: string;
  /** The declaration value, e.g. `dark` or `light-dark(#fff, #000)`. */
  value: string | number;
};

/**
 * A CSS rule or at-rule. The body is either structured (`declarations`) or
 * an opaque `raw` CSS string. `raw` is always available as an escape hatch so
 * any part of the tree can fall back to verbatim CSS when structure adds no value.
 */
export type CssRule = {
  /** Optional leading comment rendered above the rule, e.g. `Simplified Chinese`. */
  comment?: string;
  /** The selector or at-rule prelude, e.g. `:root`, `.scheme-dark`, `@supports …`. */
  selector: string;
  /** Declarations and/or nested rules belonging to this rule. */
  declarations?: CssNode[];
  /** Raw CSS body rendered verbatim instead of `declarations`. */
  raw?: string;
};

/** A raw CSS snippet (comment, blank line, deprecated alias, `@keyframes`, …) rendered verbatim. */
export type CssRaw = {
  /** The raw CSS rendered verbatim. */
  raw: string;
};

/** A plain declaration, a (possibly nested) rule, or a raw snippet. */
export type CssNode = CssRule | CssDeclaration | CssRaw;

/**
 * The full Tailwind CSS theme described as data: the output {@link file}, a human
 * readable {@link description} (consumed by the docs + LLM context) and the
 * {@link meta} — the ordered {@link CssNode} tree assembled into the final stylesheet.
 */
export type TailwindCssMeta = {
  /** The generated output file name, e.g. `index.css`. */
  file: string;
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** The ordered CssNode tree assembled into the final stylesheet. */
  meta: CssNode[];
};

/**
 * The grouping of a theme variable, used to organize the documentation. Mirrors
 * the grouping used by the storefront API pages (e.g. color is split into
 * background/foreground/semantic/a11y, spacing into fluid/static).
 */
export type TailwindThemeVariableGroup =
  | 'background'
  | 'foreground'
  | 'semantic'
  | 'a11y'
  | 'typography'
  | 'breakpoint'
  | 'fluid'
  | 'static'
  | 'border'
  | 'blur'
  | 'shadow'
  | 'motion';

/**
 * A documented Tailwind theme variable. Extends a plain {@link CssDeclaration}
 * (property + value, the single source for the `@theme` block) with the extra
 * metadata required to render the storefront docs and the LLM context.
 */
export type TailwindThemeVariable = CssDeclaration & {
  /** The Tailwind utility classes generated from this variable, e.g. `.bg-canvas`. */
  classes?: string[];
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** Grouping used to organize the documentation tables. */
  group?: TailwindThemeVariableGroup;
  /** Optional leading comment rendered above the declaration in the `@theme` block. */
  comment?: string;
};

/**
 * A documented Tailwind `@utility`. Only `selector`, `class` and `description`
 * are structured (consumed by docs + LLM context); the declaration body is kept
 * as `raw` CSS because it is pure implementation detail.
 */
export type TailwindUtility = {
  /** Optional leading comment rendered above the utility, e.g. `Grid: Area Narrow`. */
  comment?: string;
  /** The at-rule prelude, e.g. `@utility col-full`. */
  selector: string;
  /** The generated utility class, e.g. `.col-full`. */
  class: string;
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** The raw CSS declaration body (implementation detail, rendered verbatim). */
  raw: string;
};

/** A group of documented theme variables keyed by name, e.g. `tailwindMeta.color.background`. */
export type TailwindVariableGroup = Record<string, TailwindThemeVariable>;

/**
 * The docs-oriented Tailwind meta: a single global object whose parts map 1:1 to
 * the storefront Tailwind API pages and the LLM context. Unlike {@link TailwindCssMeta}
 * (the rendering meta — a flat `CssNode` tree assembled into the generated CSS), this
 * exposes the documented theme variables and utilities **already grouped** the way the
 * docs consume them, so the storefront can read a part directly
 * (e.g. `tailwindMeta.color.background`, `tailwindMeta.utilities.grid`) without having
 * to query or transform the structure. It is derived from the same single sources of
 * truth (`color`, `typography`, `radius`, `spacing`, the `*ThemeVariables` and the
 * `*Utilities` arrays) that feed {@link TailwindCssMeta}.
 */
export type TailwindMeta = {
  /** Color theme variables grouped exactly like the storefront color API tables. */
  color: Record<'background' | 'foreground' | 'semantic' | 'a11y', TailwindVariableGroup>;
  /** Typography theme variables grouped by family / weight / line height / text size. */
  typography: Record<'family' | 'weight' | 'lineHeight' | 'text', TailwindVariableGroup>;
  /** Spacing theme variables grouped into fluid / static. */
  spacing: Record<'fluid' | 'static', TailwindVariableGroup>;
  /** Border theme variables: the radius scale plus the border widths. */
  border: { radius: TailwindVariableGroup; width: TailwindThemeVariable[] };
  /** Blur theme variables. */
  blur: TailwindThemeVariable[];
  /** Shadow theme variables (documented only — deprecated aliases excluded). */
  shadow: TailwindThemeVariable[];
  /** Breakpoint theme variables backing the responsive variant prefixes (media-query page). */
  breakpoint: TailwindThemeVariable[];
  /** Motion theme variables grouped into duration / easing (documented only). */
  motion: { duration: TailwindThemeVariable[]; easing: TailwindThemeVariable[] };
  /** Documented `@utility` classes grouped by topic. */
  utilities: Record<'heading' | 'text' | 'display' | 'gradient' | 'grid' | 'skeleton', TailwindUtility[]>;
};
