// The scss meta model — the documented single source of truth these types validate. Leaves
// (`ScssVariable`, `ScssMixin`, `ScssRaw`) render to scss and docs; records and arrays only group.
// A leaf carrying `deprecation` belongs to `scssDeprecationsMeta`, never to `scssMeta`.

/**
 * The lifecycle marker of a deprecated declaration. Its mere presence — `deprecation: {}` included —
 * means the node is deprecated; both fields are refinements of the package default wording. Variable
 * versus mixin is already inferable from the node shape, so no `kind` is repeated here.
 */
export type ScssDeprecation = {
  /** Optional note replacing the package default lifecycle sentence. */
  message?: string;
  /** Canonical consumer-facing identifier, such as `$radius-sm` or `focus-visible()`. */
  replacement?: string;
};

/** A documented scss variable. Renders a docs row and a `$name: value;` declaration. */
export type ScssVariable = {
  description: string;
  value: string | number;
  /** The `$`-prefixed Sass variable name, e.g. `$radius-xs`. */
  name: string;
  /** Trailing comment rendered after the declaration. Never carries deprecation semantics. */
  comment?: string;
};

/** A documented scss mixin. Renders a `@mixin` and a docs row. */
export type ScssMixin = {
  description: string;
  name: string;
  /** Parameter list including parentheses, e.g. `()` or `($offset: 2px)`. */
  signature?: string;
  /** Verbatim mixin body — the escape hatch for `@if`, `@each`, `@content`, keyframes, … */
  raw: string;
  /** Comment rendered on its own line above the `@mixin` declaration. Never carries deprecation semantics. */
  comment?: string;
};

/**
 * A deprecated variable: the same complete render input as its documented counterpart, plus the
 * required lifecycle marker. `description` is optional because a legacy alias is documented by its
 * generated `@deprecated` comment, not by a docs row — set one only when the default guidance needs
 * more than a replacement.
 *
 * The split is what keeps `scssMeta` and `scssDeprecationsMeta` apart at the type level: a documented
 * node cannot silently gain a `deprecation`, and a deprecated node cannot silently lose one.
 */
export type DeprecatedScssVariable = Omit<ScssVariable, 'description'> & {
  description?: string;
  deprecation: ScssDeprecation;
};

/** A deprecated mixin. See {@link DeprecatedScssVariable} for why `description` is optional here. */
export type DeprecatedScssMixin = Omit<ScssMixin, 'description'> & {
  description?: string;
  deprecation: ScssDeprecation;
};

/** Any deprecated leaf — every `scssDeprecationsMeta` node is one of these. */
export type DeprecatedScssNode = DeprecatedScssVariable | DeprecatedScssMixin;

/** Any named leaf: a variable or a mixin, documented or deprecated. */
export type ScssDeclaration = ScssVariable | ScssMixin | DeprecatedScssNode;

/** A raw scss snippet (`@use`/`@forward` lines, lookup maps, …) rendered verbatim. Non-public plumbing only. */
export type ScssRaw = {
  raw: string;
};

export type ScssNode = ScssDeclaration | ScssRaw;

/** Any branch of the meta tree: a leaf {@link ScssNode}, an array, or a nested record. Only leaves render; records and arrays group. */
export type ScssBranch = ScssNode | ScssBranch[] | { [key: string]: ScssBranch };

/** A per-file composition descriptor: output file, `@use` headers, description and ordered render nodes. */
export type ScssFileMeta = {
  file: string;
  description: string;
  /** `@use` headers this file needs so namespaced cross-references resolve, e.g. `['color']`. */
  uses?: string[];
  nodes: ScssNode[];
};

/**
 * The documented single source of truth, shared with the storefront docs and LLM context. A flat,
 * domain-keyed catalog mirroring `tokensMeta`; each leaf's kind (`token` | `utility`) is recoverable
 * via `kindOf`. Catalog groups are the same object references the SCSS is built from, so docs and
 * generated SCSS can't diverge. SCSS-only plumbing lives in the composition layer (`scss/index.ts`),
 * and the legacy surface that still ships lives in `scssDeprecationsMeta`.
 */
export type ScssMeta = {
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
  blur: {
    frosted: ScssVariable;
  };
  breakpoint: {
    xs: ScssVariable;
    sm: ScssVariable;
    md: ScssVariable;
    lg: ScssVariable;
    xl: ScssVariable;
    '2xl': ScssVariable;
  };
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
  shadow: {
    sm: ScssVariable;
    md: ScssVariable;
    lg: ScssVariable;
  };
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
  gradient: {
    stopsFadeDark: ScssVariable;
  };
  typography: {
    heading: ScssMixin[];
    text: ScssMixin[];
    display: ScssMixin[];
  };
  skeleton: ScssMixin[];
  // Grouped by grid area, aligned with `EmotionMeta['grid']` / `TailwindMeta['grid']`. `template` is the
  // `pds-grid` layout mixin, `gap` a token. scss has no per-area placement utility (`column`), so areas
  // expose only line tokens (`start`/`end`), per-area `span`s and offsets; only `full` has a composed
  // `offset` variable. The per-area `offset{Base,S,XXL}` tokens read the `--pds-grid-*` custom properties.
  grid: {
    template: ScssMixin;
    gap: ScssVariable;
    narrow: {
      start: ScssVariable;
      end: ScssVariable;
      span: { oneHalf: ScssVariable };
      offsetBase: ScssVariable;
      offsetS: ScssVariable;
      offsetXXL: ScssVariable;
    };
    basic: {
      start: ScssVariable;
      end: ScssVariable;
      span: { oneHalf: ScssVariable; oneThird: ScssVariable; twoThirds: ScssVariable };
      offsetBase: ScssVariable;
      offsetS: ScssVariable;
      offsetXXL: ScssVariable;
    };
    extended: {
      start: ScssVariable;
      end: ScssVariable;
      span: { oneHalf: ScssVariable };
      offsetBase: ScssVariable;
      offsetS: ScssVariable;
      offsetXXL: ScssVariable;
    };
    wide: {
      start: ScssVariable;
      end: ScssVariable;
      offsetBase: ScssVariable;
      offsetS: ScssVariable;
      offsetXXL: ScssVariable;
    };
    full: {
      start: ScssVariable;
      end: ScssVariable;
      offset: ScssVariable;
    };
  };
  focus: ScssMixin[];
  mediaQuery: ScssMixin[];
};
