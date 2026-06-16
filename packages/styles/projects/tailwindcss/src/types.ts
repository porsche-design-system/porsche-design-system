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
 * Any branch of the meta tree: a concrete {@link CssNode} leaf, an array of branches, or a
 * nested record of branches. Records and arrays are grouping containers (for the docs); only
 * leaves render. Lets the recipe flatten any part of `tailwindMeta` uniformly.
 */
export type ThemeBranch = CssNode | ThemeBranch[] | { [key: string]: ThemeBranch };

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
 * Solution-agnostic shape of a single design-token entry: a human readable
 * {@link description} plus the rendered {@link value}. This is the shared contract —
 * the common vocabulary every styling solution (Tailwind, emotion, scss, …) can
 * implement, extending it with its own representation (Tailwind adds `property` /
 * `classes`). Kept minimal on purpose so the catalog shape ({@link ThemeCatalog})
 * can be lifted into a shared module later.
 */
export type TokenMeta = {
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** The rendered value (a token, a CSS expression, …). */
  value: string | number;
};

/** A group of tokens keyed by size/name, e.g. `theme.color.background` or `theme.spacing.fluid`. */
export type TokenGroup<T extends TokenMeta = TokenMeta> = Record<string, T>;

/**
 * The shared design-token catalog shape — the common group taxonomy and size keys
 * reused across `tokens`, stylesheets' `cssVariablesMeta` and the styling solutions.
 * Generic over the token type so each solution plugs in its own entry type (Tailwind
 * uses {@link TailwindThemeVariable}). Solution-agnostic: it describes *what* tokens
 * exist and how they are grouped, not how a given solution renders them.
 */
export type ThemeCatalog<T extends TokenMeta = TokenMeta> = {
  color: Record<'background' | 'foreground' | 'semantic' | 'a11y', TokenGroup<T>>;
  typography: Record<'family' | 'weight' | 'lineHeight' | 'text', TokenGroup<T>>;
  spacing: Record<'fluid' | 'static', TokenGroup<T>>;
  border: { radius: TokenGroup<T>; width: T[] };
  blur: T[];
  shadow: T[];
  breakpoint: T[];
  motion: { duration: T[]; easing: T[] };
};

/**
 * A documented Tailwind theme variable — a {@link TokenMeta} (the shared description +
 * value) extended with the Tailwind-specific `property` (the single source for the
 * `@theme` block) and the metadata required to render the storefront docs and the
 * LLM context. Assignable to {@link CssDeclaration} (`property` + `value`).
 */
export type TailwindThemeVariable = TokenMeta & {
  /** The CSS custom property feeding the `@theme` block, e.g. `--color-canvas`. */
  property: string;
  /** The Tailwind utility classes generated from this variable, e.g. `.bg-canvas`. */
  classes?: string[];
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

/** A group of documented theme variables keyed by name, e.g. `tailwindMeta.theme.color.background`. */
export type TailwindVariableGroup = TokenGroup<TailwindThemeVariable>;

/** Documented `@utility` classes grouped by topic (docs + LLM + the generated `@utility` blocks). */
export type TailwindUtilities = Record<'heading' | 'text' | 'display' | 'gradient' | 'grid' | 'skeleton', TailwindUtility[]>;

/**
 * The non-documented, solution-specific additions that still render **inside** the
 * `@theme` block, alongside the documented {@link ThemeCatalog} tokens. Never surfaced
 * in the docs. This is a per-solution extension point.
 */
export type TailwindThemeExtras = {
  /** `@theme` namespace resets (`--color-*: initial`, …) clearing the framework defaults. */
  resets: CssNode[];
  /** Base colors retained after the reset (`--color-black` / `--color-white`). */
  baseColors: CssNode[];
  /** The default focus outline width (`--default-outline-width`). */
  outlineWidth: CssNode;
  /** Tailwind-required `--text-*--line-height` companions plus the `--text-base` alias. */
  typographyCompanions: TailwindThemeVariable[];
  /** Deprecated theme-variable aliases kept for back-compat (not documented). */
  deprecatedAliases: { shadow: TailwindThemeVariable[]; motion: TailwindThemeVariable[] };
  /** Tailwind transition defaults (`--default-transition-*`), interleaved with motion in the `@theme`. */
  transitionDefaults: { timingFunction: TailwindThemeVariable; duration: TailwindThemeVariable };
  /** The skeleton `@keyframes` plus its `--animate-skeleton` theme variable. */
  keyframes: CssNode[];
};

/**
 * The full `@theme` content: the shared, documented design-token catalog
 * ({@link ThemeCatalog}) plus the solution-specific {@link TailwindThemeExtras}. Everything
 * here renders inside the generated `@theme` block.
 */
export type TailwindTheme = ThemeCatalog<TailwindThemeVariable> & TailwindThemeExtras;

/**
 * The solution-specific rules rendered **outside** the `@theme` block — globally
 * (`@layer base`) or as utilities (`@utility`). The per-solution extension point for
 * font application, color-scheme handling, etc.
 */
export type TailwindLayers = {
  /** The `@layer base` locale-aware Porsche Next font base layer. */
  fontBase: CssRule;
  /** The `@layer base` `light-dark()` color-scheme fallback. */
  schemeFallback: CssRule;
  /** The `@utility scheme-*` blocks. */
  schemeUtilities: CssRule[];
};

/**
 * The single source of truth for the Tailwind styling solution — drives the generated
 * CSS file, the storefront docs and (later) the LLM context. Three sections, split by
 * where they render:
 *
 * - {@link theme}: everything inside the `@theme` block — the shared-shape design-token
 *   catalog (documented) plus the solution-specific {@link TailwindThemeExtras}.
 * - {@link utilities}: the documented `@utility` blocks.
 * - {@link layers}: the solution-specific rules rendered outside `@theme` (font base layer,
 *   color-scheme fallback, `scheme-*` utilities).
 *
 * The catalog groups + `utilities` carry `description`s and stable grouping/keys, which is
 * everything a future `getLlmContext()` serializer needs. The CSS is assembled from this
 * object only.
 */
export type TailwindMeta = {
  /** Everything rendered inside the `@theme` block (documented catalog + solution-specific additions). */
  theme: TailwindTheme;
  /** Documented `@utility` blocks. */
  utilities: TailwindUtilities;
  /** Solution-specific rules rendered outside `@theme` (global layers / utilities). */
  layers: TailwindLayers;
};
