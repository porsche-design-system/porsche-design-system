// The scss meta model. The solution-agnostic base shapes (`TokenMeta`, `UtilityMeta`,
// `TokenGroup`, `ThemeCatalog`, `UtilitiesCatalog`) are **duplicated** from the tailwindcss
// package rather than shared, so the scss package stays self-contained (see the ADR for the
// future extraction path). The scss-specific render nodes mirror tailwind's CSS nodes.

/**
 * Solution-agnostic shape of a design-token entry: `description` + rendered `value`. The shared
 * contract every styling solution extends with its own representation (scss adds `$`-prefixed `name`).
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
 * there is no shared `value` — each solution plugs in its own entry type (scss will add `ScssMixin`).
 */
export type UtilityMeta = {
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
};

/**
 * Shared design-token catalog shape — the common group taxonomy reused across solutions. Generic
 * over the token type so the scss package plugs in {@link ScssVariable}.
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
 * (typography shorthands, gradients, grid, skeletons). The scss-specific superset (focus,
 * mediaQuery, …) is added when the mixin rails land. Generic over the utility type.
 */
export type UtilitiesCatalog<T extends UtilityMeta = UtilityMeta> = {
  typography: { heading: T[]; text: T[]; display: T[] };
  gradient: T[];
  grid: T[];
  skeleton: T[];
};

/** Doc grouping of a theme variable, mirroring the storefront API pages and the tailwind taxonomy. */
export type ScssVariableGroup =
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
 * A documented scss variable — {@link TokenMeta} extended with the `$`-prefixed `name` plus doc
 * metadata. It is also a render node: the same object renders both a docs table row and a
 * `$name: value;` declaration.
 */
export type ScssVariable = TokenMeta & {
  /** The `$`-prefixed Sass variable name, e.g. `$radius-xs`. */
  name: string;
  /** Grouping used to organize the documentation tables. */
  group?: ScssVariableGroup;
  /** Optional trailing comment rendered after the declaration, e.g. `alias (deprecated)`. */
  comment?: string;
};

/** A raw scss snippet (deprecated alias block, `@use`/`@forward` lines, …) rendered verbatim. */
export type ScssRaw = {
  /** The raw scss rendered verbatim. */
  raw: string;
};

/** A leaf render node: a documented variable or a raw snippet. (Mixin nodes are added later.) */
export type ScssNode = ScssVariable | ScssRaw;

/**
 * Any branch of the meta tree: a {@link ScssNode} leaf, an array, or a nested record.
 * Records/arrays group for the docs; only leaves render. Lets the composition flatten uniformly.
 */
export type ScssBranch = ScssNode | ScssBranch[] | { [key: string]: ScssBranch };

/**
 * A per-file composition descriptor: the output file, its `@use` headers, a description and the
 * ordered render nodes interleaving documented entries (by identity) with plumbing.
 */
export type ScssFileMeta = {
  /** The generated output file name, e.g. `_border.scss`. */
  file: string;
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
  /** `@use` headers this file needs so namespaced cross-references resolve, e.g. `['color']`. */
  uses?: string[];
  /** The ordered render nodes assembled into the partial. */
  nodes: ScssNode[];
};

/**
 * The documented single source of truth shared with the storefront docs and LLM context. SCSS-only
 * plumbing (deprecated `$pds-*` aliases, private helpers, the theming mixin, the `@forward` index)
 * is intentionally **not** here — it lives in the composition layer (`scss/index.ts`). The catalog
 * groups are the same object references the SCSS is built from, so docs and generated SCSS can never
 * diverge.
 *
 * The variable-only domains are migrated; the remaining theme groups (color, typography) and the
 * utility groups are added by later slices.
 */
export type ScssMeta = {
  /** The documented design-token catalog. The variable-only groups are migrated; color/typography are added later. */
  theme: Partial<ThemeCatalog<ScssVariable>> &
    Pick<ThemeCatalog<ScssVariable>, 'border' | 'blur' | 'breakpoint' | 'color' | 'shadow' | 'spacing' | 'motion'>;
  /** The documented mixins. Empty until the mixin rails land. */
  utilities: Partial<UtilitiesCatalog>;
};
