// The scss meta model — the documented single source of truth these types validate. Leaves
// (`ScssVariable`, `ScssMixin`, `ScssRaw`) render to scss and docs; records and arrays only group.

/** A documented scss variable. Renders a docs row and a `$name: value;` declaration. */
export type ScssVariable = {
  description: string;
  value: string | number;
  /** The `$`-prefixed Sass variable name, e.g. `$radius-xs`. */
  name: string;
  /** Trailing comment rendered after the declaration, e.g. `alias (deprecated)`. */
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
  /** Comment rendered on its own line above the `@mixin` declaration. */
  comment?: string;
};

/** A raw scss snippet (deprecated alias block, `@use`/`@forward` lines, …) rendered verbatim. */
export type ScssRaw = {
  raw: string;
};

export type ScssNode = ScssVariable | ScssMixin | ScssRaw;

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
 * generated SCSS can't diverge. SCSS-only plumbing lives in the composition layer (`scss/index.ts`).
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
  grid: (ScssVariable | ScssMixin)[];
  focus: ScssMixin[];
  mediaQuery: ScssMixin[];
};
