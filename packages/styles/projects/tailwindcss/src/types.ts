/** A single CSS declaration, e.g. `color-scheme: dark` or `--p-color-canvas: #fff`. */
export type CssDeclaration = {
  /** Optional leading comment rendered above the declaration, e.g. `alias (deprecated)`. */
  comment?: string;
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
 * Solution-agnostic shape of a single documented utility: just a human readable
 * {@link description}. The utility *contract* (a heading helper, a skeleton helper, …) is shared
 * across styling solutions, but unlike {@link TokenMeta} there is no shared `value` — the
 * naming and implementation differ per solution, so each plugs in its own entry type (Tailwind
 * uses {@link TailwindUtility}, adding `selector` / `class` / `raw`).
 */
export type UtilityMeta = {
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
};

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
 * The shared documented-utility catalog shape — the common topic grouping every styling solution
 * exposes (typography helpers, gradients, the layout grid, skeletons). Generic over the utility
 * type so each solution plugs in its own entry type (Tailwind uses {@link TailwindUtility}).
 * Solution-agnostic: it describes *which* documented utilities exist, not how they are rendered.
 */
export type UtilitiesCatalog<T extends UtilityMeta = UtilityMeta> = Record<
  'heading' | 'text' | 'display' | 'gradient' | 'grid' | 'skeleton',
  T[]
>;

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
 * A documented Tailwind `@utility` — a {@link UtilityMeta} (the shared `description`) extended
 * with the Tailwind-specific `selector` / `class` (consumed by docs + LLM context) and the
 * `raw` declaration body (kept as raw CSS because it is pure implementation detail).
 */
export type TailwindUtility = UtilityMeta & {
  /** Optional leading comment rendered above the utility, e.g. `Grid: Area Narrow`. */
  comment?: string;
  /** The at-rule prelude, e.g. `@utility col-full`. */
  selector: string;
  /** The generated utility class, e.g. `.col-full`. */
  class: string;
  /** The raw CSS declaration body (implementation detail, rendered verbatim). */
  raw: string;
};

/** A group of documented theme variables keyed by name, e.g. `tailwindMeta.theme.color.background`. */
export type TailwindVariableGroup = TokenGroup<TailwindThemeVariable>;

/** Documented `@utility` classes grouped by topic (docs + LLM + the generated `@utility` blocks). */
export type TailwindUtilities = UtilitiesCatalog<TailwindUtility>;

/**
 * The documented single source of truth for the Tailwind styling solution — the surface shared
 * with the storefront docs and the LLM context. Two sections, both carrying `description`s and
 * stable grouping/keys (everything a `getLlmContext()` serializer needs):
 *
 * - {@link theme}: the shared-shape, documented design-token {@link ThemeCatalog}.
 * - {@link utilities}: the documented `@utility` blocks ({@link UtilitiesCatalog}).
 *
 * Solution-specific CSS-generation plumbing (resets, defaults, layers, keyframes, deprecated
 * aliases) is intentionally **not** here — it lives alongside the assembly in `css.ts`. The CSS
 * file is assembled from this documented model plus that plumbing; the catalog groups are the same
 * object references, so the docs and the generated CSS can never diverge.
 */
export type TailwindMeta = {
  /** The documented, shared-shape design-token catalog rendered inside the `@theme` block. */
  theme: ThemeCatalog<TailwindThemeVariable>;
  /** The documented `@utility` blocks. */
  utilities: TailwindUtilities;
};
