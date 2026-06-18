/** A single CSS declaration, e.g. `color-scheme: dark` or `--p-color-canvas: #fff`. */
export type CssDeclaration = {
  /** Optional leading comment rendered above the declaration. */
  comment?: string;
  /** The CSS property or custom property. */
  property: string;
  /** The declaration value. */
  value: string | number;
};

/** A CSS rule or at-rule. Body is structured (`declarations`) or verbatim (`raw`). */
export type CssRule = {
  /** Optional leading comment rendered above the rule. */
  comment?: string;
  /** The selector or at-rule prelude, e.g. `:root`, `@supports …`. */
  selector: string;
  /** Declarations and/or nested rules belonging to this rule. */
  declarations?: CssNode[];
  /** Raw CSS body rendered verbatim instead of `declarations`. */
  raw?: string;
};

/** A raw CSS snippet (comment, deprecated alias, `@keyframes`, …) rendered verbatim. */
export type CssRaw = {
  /** The raw CSS rendered verbatim. */
  raw: string;
};

/** A declaration, a (possibly nested) rule, or a raw snippet. */
export type CssNode = CssRule | CssDeclaration | CssRaw;

/**
 * Any branch of the meta tree: a {@link CssNode} leaf, an array, or a nested record.
 * Records/arrays group for the docs; only leaves render. Lets the assembly flatten uniformly.
 */
export type ThemeBranch = CssNode | ThemeBranch[] | { [key: string]: ThemeBranch };

/** The full Tailwind CSS theme as data: output {@link file}, {@link description}, ordered {@link meta} tree. */
export type TailwindCssMeta = {
  /** The generated output file name, e.g. `index.css`. */
  file: string;
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** The ordered CssNode tree assembled into the final stylesheet. */
  meta: CssNode[];
};

/** Doc grouping of a theme variable, mirroring the storefront API pages. */
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
 * Solution-agnostic shape of a design-token entry: `description` + rendered `value`. The shared
 * contract every styling solution extends with its own representation (Tailwind adds `property` / `classes`).
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
 * Solution-agnostic shape of a documented utility: just a `description`. Unlike {@link TokenMeta}
 * there is no shared `value` — each solution plugs in its own entry type (Tailwind uses {@link TailwindUtility}).
 */
export type UtilityMeta = {
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
};

/**
 * Shared design-token catalog shape — the common group taxonomy reused across solutions. Generic
 * over the token type so each solution plugs in its own entry (Tailwind uses {@link TailwindThemeVariable}).
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
 * Shared documented-utility catalog shape — the common topic grouping every solution exposes
 * (typography shorthands, gradients, grid, skeletons). Generic over the utility type (Tailwind
 * uses {@link TailwindUtility}).
 */
export type UtilitiesCatalog<T extends UtilityMeta = UtilityMeta> = {
  typography: { heading: T[]; text: T[]; display: T[] };
  gradient: T[];
  grid: T[];
  skeleton: T[];
};

/**
 * A documented Tailwind theme variable — {@link TokenMeta} extended with the Tailwind-specific
 * `property` (source for the `@theme` block) plus doc metadata. Assignable to {@link CssDeclaration}.
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
 * A documented Tailwind `@utility` — {@link UtilityMeta} extended with `selector` / `class` (docs)
 * and the `raw` declaration body (implementation detail, rendered verbatim).
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

/** Documented `@utility` classes grouped by topic (docs + LLM + the generated `@utility` blocks). */
export type TailwindUtilities = UtilitiesCatalog<TailwindUtility>;

/**
 * The documented single source of truth shared with the storefront docs and LLM context. CSS-generation
 * plumbing (resets, defaults, layers, keyframes, deprecated aliases) is intentionally **not** here — it
 * lives alongside the assembly in `css/index.ts`. The catalog groups are the same object references the
 * CSS is built from, so docs and generated CSS can never diverge.
 */
export type TailwindMeta = {
  /** The documented design-token catalog rendered inside the `@theme` block. */
  theme: ThemeCatalog<TailwindThemeVariable>;
  /** The documented `@utility` blocks. */
  utilities: TailwindUtilities;
};
