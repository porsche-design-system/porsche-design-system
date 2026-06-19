// The scss meta model. `ScssMeta` is the documented single source of truth: a `theme` of design-token
// variables and a `utilities` catalog of mixins, every group and key spelled out inline so the types
// read like the data they validate. Leaves are `ScssVariable` (a documented `$`-variable) and `ScssMixin`.

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

/** A documented scss variable: `description` + rendered `value` + `$`-prefixed `name`. Renders both a docs row and a `$name: value;` declaration. */
export type ScssVariable = {
  /** Description rendered in the docs and LLM context. */
  description: string;
  /** The rendered value (a token, a CSS expression, …). */
  value: string | number;
  /** The `$`-prefixed Sass variable name, e.g. `$radius-xs`. */
  name: string;
  /** Grouping used to organize the documentation tables. */
  group?: ScssVariableGroup;
  /** Optional trailing comment rendered after the declaration, e.g. `alias (deprecated)`. */
  comment?: string;
};

/** A documented scss mixin: `description` + `name`, optional `signature` and verbatim `raw` body. Renders a `@mixin` and a docs row. */
export type ScssMixin = {
  /** Description rendered in the docs and LLM context. */
  description: string;
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
 * The documented single source of truth shared with the storefront docs and LLM context. A flat,
 * domain-keyed catalog mirroring `tokensMeta`: token domains use the tokens vocabulary, the
 * utility-only domains (`typography` prose, `skeleton`, `focus`, `mediaQuery`) stand alone, and
 * `grid` holds both kinds. Each leaf's kind (`token` | `utility`) is recoverable via `kindOf`;
 * SCSS-only plumbing lives in the composition layer (`scss/index.ts`), not here. Catalog groups are
 * the same object references the SCSS is built from, so docs and generated SCSS can't diverge.
 */
export type ScssMeta = {
  /** Border token variables: the `radius` scale plus the (deprecated-only) `width` list. */
  border: {
    radius: {
      xs: ScssVariable;
      sm: ScssVariable;
      md: ScssVariable;
      lg: ScssVariable;
      xl: ScssVariable;
      '2xl': ScssVariable;
      '3xl': ScssVariable;
      '4xl': ScssVariable;
      full: ScssVariable;
    };
    width: ScssVariable[];
  };
  /** Blur token variables keyed by variant. */
  blur: {
    frosted: ScssVariable;
  };
  /** Breakpoint token variables keyed by size. */
  breakpoint: {
    xs: ScssVariable;
    sm: ScssVariable;
    md: ScssVariable;
    lg: ScssVariable;
    xl: ScssVariable;
    '2xl': ScssVariable;
  };
  /** Color token variables grouped by role. */
  color: {
    background: {
      canvas: ScssVariable;
      surface: ScssVariable;
      frosted: ScssVariable;
      frostedSoft: ScssVariable;
      frostedStrong: ScssVariable;
      backdrop: ScssVariable;
    };
    foreground: {
      primary: ScssVariable;
      contrastHigher: ScssVariable;
      contrastHigh: ScssVariable;
      contrastMedium: ScssVariable;
      contrastLow: ScssVariable;
      contrastLower: ScssVariable;
    };
    semantic: {
      info: ScssVariable;
      infoMedium: ScssVariable;
      infoLow: ScssVariable;
      infoFrosted: ScssVariable;
      infoFrostedSoft: ScssVariable;
      success: ScssVariable;
      successMedium: ScssVariable;
      successLow: ScssVariable;
      successFrosted: ScssVariable;
      successFrostedSoft: ScssVariable;
      warning: ScssVariable;
      warningMedium: ScssVariable;
      warningLow: ScssVariable;
      warningFrosted: ScssVariable;
      warningFrostedSoft: ScssVariable;
      error: ScssVariable;
      errorMedium: ScssVariable;
      errorLow: ScssVariable;
      errorFrosted: ScssVariable;
      errorFrostedSoft: ScssVariable;
    };
    a11y: {
      focus: ScssVariable;
    };
  };
  /** Font token variables grouped by facet (mirrors `tokensMeta.font`). The prose mixins live under `typography`. */
  font: {
    family: {
      porscheNext: ScssVariable;
      porscheNextZhHans: ScssVariable;
      porscheNextZhHant: ScssVariable;
      porscheNextJa: ScssVariable;
      porscheNextKo: ScssVariable;
    };
    weight: {
      normal: ScssVariable;
      semibold: ScssVariable;
      bold: ScssVariable;
    };
    lineHeight: {
      normal: ScssVariable;
    };
    size: {
      '2xs': ScssVariable;
      xs: ScssVariable;
      sm: ScssVariable;
      md: ScssVariable;
      lg: ScssVariable;
      xl: ScssVariable;
      '2xl': ScssVariable;
      '3xl': ScssVariable;
      '4xl': ScssVariable;
      '5xl': ScssVariable;
    };
  };
  /** Shadow token variables keyed by size. */
  shadow: {
    sm: ScssVariable;
    md: ScssVariable;
    lg: ScssVariable;
  };
  /** Spacing token variables grouped by scaling behavior. */
  spacing: {
    fluid: {
      xs: ScssVariable;
      sm: ScssVariable;
      md: ScssVariable;
      lg: ScssVariable;
      xl: ScssVariable;
      '2xl': ScssVariable;
    };
    static: {
      '2xs': ScssVariable;
      xs: ScssVariable;
      sm: ScssVariable;
      md: ScssVariable;
      lg: ScssVariable;
      xl: ScssVariable;
      '2xl': ScssVariable;
    };
  };
  /** Motion token variables grouped into the `duration` and `ease` scales. */
  motion: {
    duration: {
      sm: ScssVariable;
      md: ScssVariable;
      lg: ScssVariable;
      xl: ScssVariable;
    };
    ease: {
      inOut: ScssVariable;
      in: ScssVariable;
      out: ScssVariable;
    };
  };
  /** Gradient token variables keyed by variant. */
  gradient: {
    stopsFadeDark: ScssVariable;
  };
  /** Prose typography mixins grouped by element; `display` stays empty in scss (plumbing-only). */
  typography: {
    heading: ScssMixin[];
    text: ScssMixin[];
    display: ScssMixin[];
  };
  /** The `skeleton()` loading-placeholder mixin. */
  skeleton: ScssMixin[];
  /** The `focus-visible()` mixin. */
  focus: ScssMixin[];
  /** The `media-query-*` mixins. */
  mediaQuery: ScssMixin[];
  /** The Porsche Grid domain: the token variables (flat, ordered) plus the `pds-grid` layout mixin. */
  grid: (ScssVariable | ScssMixin)[];
};
