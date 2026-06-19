// The scss meta model. The base shapes (`TokenMeta`, `UtilityMeta`, `TokenGroup`, `ThemeCatalog`,
// `UtilitiesCatalog`) are duplicated from the tailwindcss package to keep this package self-contained.

/** Solution-agnostic design-token entry: `description` + rendered `value`. scss extends it with a `$`-prefixed `name`. */
export type TokenMeta = {
  /** Description rendered in the docs and LLM context. */
  description: string;
  /** The rendered value (a token, a CSS expression, …). */
  value: string | number;
};

/** A group of tokens keyed by size/name, e.g. `theme.color.background` or `theme.spacing.fluid`. */
export type TokenGroup<T extends TokenMeta = TokenMeta> = Record<string, T>;

/** Solution-agnostic documented utility: just a `description`. scss extends it with {@link ScssMixin}. */
export type UtilityMeta = {
  /** Description rendered in the docs and LLM context. */
  description: string;
};

/** Shared design-token catalog shape reused across solutions. Generic over the token type ({@link ScssVariable} for scss). */
export type ThemeCatalog<T extends TokenMeta = TokenMeta> = {
  color: Record<'background' | 'foreground' | 'semantic' | 'a11y', TokenGroup<T>>;
  typography: Record<'family' | 'weight' | 'lineHeight' | 'text', TokenGroup<T>>;
  spacing: Record<'fluid' | 'static', TokenGroup<T>>;
  border: { radius: TokenGroup<T>; width: T[] };
  blur: T[];
  shadow: T[];
  breakpoint: T[];
  motion: { duration: T[]; easing: T[] };
  gradient: T[];
  grid: T[];
};

/**
 * Shared documented-utility catalog shape. `focus` / `mediaQuery` are scss-specific; `gradient` and
 * `typography.display` map only to plumbing in scss, so they stay unpopulated in `scssMeta`.
 */
export type UtilitiesCatalog<T extends UtilityMeta = UtilityMeta> = {
  typography: { heading: T[]; text: T[]; display: T[] };
  gradient: T[];
  grid: T[];
  skeleton: T[];
  focus: T[];
  mediaQuery: T[];
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
  | 'motion'
  | 'gradient'
  | 'grid';

/** A documented scss variable: {@link TokenMeta} + `$`-prefixed `name`. Renders both a docs row and a `$name: value;` declaration. */
export type ScssVariable = TokenMeta & {
  /** The `$`-prefixed Sass variable name, e.g. `$radius-xs`. */
  name: string;
  /** Grouping used to organize the documentation tables. */
  group?: ScssVariableGroup;
  /** Optional trailing comment rendered after the declaration, e.g. `alias (deprecated)`. */
  comment?: string;
};

/** A documented scss mixin: {@link UtilityMeta} + `name`, optional `signature` and verbatim `raw` body. Renders a `@mixin` and a docs row. */
export type ScssMixin = UtilityMeta & {
  /** The mixin name, e.g. `skeleton` or `focus-visible`. */
  name: string;
  /** The raw parameter list including parentheses, e.g. `()` or `($offset: 2px)`. */
  signature?: string;
  /** The verbatim mixin body (the escape hatch — supports `@if`, `@each`, `@content`, keyframes, …). */
  raw: string;
  /** Optional comment rendered on its own line above the `@mixin` declaration. */
  comment?: string;
};

/** A raw scss snippet (deprecated alias block, `@use`/`@forward` lines, …) rendered verbatim. */
export type ScssRaw = {
  /** The raw scss rendered verbatim. */
  raw: string;
};

/** A leaf render node: a documented variable, a documented mixin or a raw snippet. */
export type ScssNode = ScssVariable | ScssMixin | ScssRaw;

/** Any branch of the meta tree: a {@link ScssNode} leaf, an array, or a nested record. Only leaves render; records/arrays group. */
export type ScssBranch = ScssNode | ScssBranch[] | { [key: string]: ScssBranch };

/** A per-file composition descriptor: output file, `@use` headers, description and ordered render nodes. */
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
 * plumbing lives in the composition layer (`scss/index.ts`), not here. Catalog groups are the same
 * object references the SCSS is built from, so docs and generated SCSS can't diverge.
 */
export type ScssMeta = {
  /** The documented design-token catalog — every variable group. */
  theme: Partial<ThemeCatalog<ScssVariable>> &
    Pick<
      ThemeCatalog<ScssVariable>,
      'border' | 'blur' | 'breakpoint' | 'color' | 'typography' | 'shadow' | 'spacing' | 'motion' | 'gradient' | 'grid'
    >;
  /** The documented mixins: typography, skeleton, focus, media-query and grid (`gradient`/`display` are plumbing-only). */
  utilities: Partial<UtilitiesCatalog<ScssMixin>> &
    Pick<UtilitiesCatalog<ScssMixin>, 'typography' | 'skeleton' | 'focus' | 'mediaQuery' | 'grid'>;
};
