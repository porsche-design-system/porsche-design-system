// The vanilla-extract meta model — the documented single source of truth these types validate. Leaves
// (`VanillaExtractToken`, `VanillaExtractUtility`) carry payloads; records and arrays only group.
// Mirrors the scss meta skeleton (`scss/src/types.ts`); a leaf's kind is recovered via `kindOf` (`./kind`).

/** A documented referenceable value (color, radius, breakpoint, font-size, …). */
export type VanillaExtractToken = {
  name: string;
  description: string;
  value: string | number;
};

/** A documented applied style — a vanilla-extract style object or a function returning one
 *  (focus/mediaQuery/skeleton/typography helpers, grid styles, …). */
export type VanillaExtractUtility = {
  name: string;
  description: string;
  styles: readonly unknown[] | Record<string, unknown> | ((...args: any[]) => unknown);
};

export type VanillaExtractNode = VanillaExtractToken | VanillaExtractUtility;

/** Any branch of the meta tree: a leaf {@link VanillaExtractNode}, an array, or a nested record. Only leaves carry payloads. */
export type VanillaExtractBranch =
  | VanillaExtractNode
  | VanillaExtractBranch[]
  | { [key: string]: VanillaExtractBranch };

/**
 * The documented single source of truth, shared with the storefront docs and LLM context. A flat,
 * domain-keyed catalog mirroring `scssMeta`'s skeleton; each leaf's kind (`token` | `utility`) is
 * recoverable via `kindOf`. The catalog is deprecation-free (deprecated symbols stay public via the
 * `src/<domain>/deprecated` barrels but aren't documented). Token sub-groups adopt scss's short keys;
 * the full export name is preserved in each leaf's `name`.
 */
export type VanillaExtractMeta = {
  border: {
    radius: {
      xs: VanillaExtractToken;
      sm: VanillaExtractToken;
      md: VanillaExtractToken;
      lg: VanillaExtractToken;
      xl: VanillaExtractToken;
      '2xl': VanillaExtractToken;
      '3xl': VanillaExtractToken;
      '4xl': VanillaExtractToken;
      full: VanillaExtractToken;
    };
  };
  blur: {
    frosted: VanillaExtractToken;
  };
  breakpoint: {
    xs: VanillaExtractToken;
    sm: VanillaExtractToken;
    md: VanillaExtractToken;
    lg: VanillaExtractToken;
    xl: VanillaExtractToken;
    '2xl': VanillaExtractToken;
    breakpoint: VanillaExtractUtility;
    breakpoints: VanillaExtractUtility;
    breakpointBase: VanillaExtractToken;
  };
  color: {
    background: {
      canvas: VanillaExtractToken;
      surface: VanillaExtractToken;
      frosted: VanillaExtractToken;
      frostedSoft: VanillaExtractToken;
      frostedStrong: VanillaExtractToken;
      backdrop: VanillaExtractToken;
    };
    foreground: {
      primary: VanillaExtractToken;
      contrastHigher: VanillaExtractToken;
      contrastHigh: VanillaExtractToken;
      contrastMedium: VanillaExtractToken;
      contrastLow: VanillaExtractToken;
      contrastLower: VanillaExtractToken;
    };
    semantic: {
      info: VanillaExtractToken;
      infoMedium: VanillaExtractToken;
      infoLow: VanillaExtractToken;
      infoFrosted: VanillaExtractToken;
      infoFrostedSoft: VanillaExtractToken;
      success: VanillaExtractToken;
      successMedium: VanillaExtractToken;
      successLow: VanillaExtractToken;
      successFrosted: VanillaExtractToken;
      successFrostedSoft: VanillaExtractToken;
      warning: VanillaExtractToken;
      warningMedium: VanillaExtractToken;
      warningLow: VanillaExtractToken;
      warningFrosted: VanillaExtractToken;
      warningFrostedSoft: VanillaExtractToken;
      error: VanillaExtractToken;
      errorMedium: VanillaExtractToken;
      errorLow: VanillaExtractToken;
      errorFrosted: VanillaExtractToken;
      errorFrostedSoft: VanillaExtractToken;
    };
    a11y: {
      focus: VanillaExtractToken;
    };
    colorSchemeStyles: VanillaExtractUtility;
  };
  font: {
    family: {
      porscheNext: VanillaExtractToken;
      porscheNextZhHans: VanillaExtractToken;
      porscheNextZhHant: VanillaExtractToken;
      porscheNextJa: VanillaExtractToken;
      porscheNextKo: VanillaExtractToken;
    };
    weight: {
      normal: VanillaExtractToken;
      semibold: VanillaExtractToken;
      bold: VanillaExtractToken;
    };
    lineHeight: {
      normal: VanillaExtractToken;
    };
    size: {
      '2xs': VanillaExtractToken;
      xs: VanillaExtractToken;
      sm: VanillaExtractToken;
      md: VanillaExtractToken;
      lg: VanillaExtractToken;
      xl: VanillaExtractToken;
      '2xl': VanillaExtractToken;
      '3xl': VanillaExtractToken;
      '4xl': VanillaExtractToken;
      '5xl': VanillaExtractToken;
    };
    getCJKFontFamilyStyle: VanillaExtractUtility;
    fontHyphenationStyle: VanillaExtractUtility;
  };
  shadow: {
    sm: VanillaExtractToken;
    md: VanillaExtractToken;
    lg: VanillaExtractToken;
  };
  spacing: {
    fluid: {
      xs: VanillaExtractToken;
      sm: VanillaExtractToken;
      md: VanillaExtractToken;
      lg: VanillaExtractToken;
      xl: VanillaExtractToken;
      '2xl': VanillaExtractToken;
    };
    static: {
      '2xs': VanillaExtractToken;
      xs: VanillaExtractToken;
      sm: VanillaExtractToken;
      md: VanillaExtractToken;
      lg: VanillaExtractToken;
      xl: VanillaExtractToken;
      '2xl': VanillaExtractToken;
    };
  };
  motion: {
    duration: {
      sm: VanillaExtractToken;
      md: VanillaExtractToken;
      lg: VanillaExtractToken;
      xl: VanillaExtractToken;
    };
    ease: {
      inOut: VanillaExtractToken;
      in: VanillaExtractToken;
      out: VanillaExtractToken;
    };
  };
  gradient: {
    stopsFadeDark: VanillaExtractToken;
  };
  typography: {
    heading: {
      '5xl': VanillaExtractUtility;
      '4xl': VanillaExtractUtility;
      '3xl': VanillaExtractUtility;
      '2xl': VanillaExtractUtility;
      xl: VanillaExtractUtility;
      lg: VanillaExtractUtility;
      md: VanillaExtractUtility;
      sm: VanillaExtractUtility;
      xs: VanillaExtractUtility;
      '2xs': VanillaExtractUtility;
    };
    text: {
      '5xl': VanillaExtractUtility;
      '4xl': VanillaExtractUtility;
      '3xl': VanillaExtractUtility;
      '2xl': VanillaExtractUtility;
      xl: VanillaExtractUtility;
      lg: VanillaExtractUtility;
      md: VanillaExtractUtility;
      sm: VanillaExtractUtility;
      xs: VanillaExtractUtility;
      '2xs': VanillaExtractUtility;
    };
    // Kept as an empty group for 1:1 shape parity with `ScssMeta['typography'].display`.
    display: Record<string, never>;
  };
  skeleton: {
    getSkeletonStyle: VanillaExtractUtility;
    // vanilla-extract-specific export with no emotion/scss counterpart: the `keyframes` object passed
    // to vanilla-extract's `keyframes()`. Kept keyed by export name.
    skeletonKeyframes: VanillaExtractUtility;
  };
  focus: {
    getFocusVisibleStyle: VanillaExtractUtility;
  };
  mediaQuery: {
    getMediaQueryMax: VanillaExtractUtility;
    getMediaQueryMin: VanillaExtractUtility;
    getMediaQueryMinMax: VanillaExtractUtility;
  };
  // Grouped by grid area, aligned with `ScssMeta['grid']` / `TailwindMeta['grid']`. `template` is the
  // whole-grid layout, `gap` a token; each area carries its placement utility (`column`), line tokens
  // (`start`/`end`), per-area `span`s, the composed `offset` utility and its `offset{Base,S,XXL}` tokens.
  grid: {
    template: VanillaExtractUtility;
    gap: VanillaExtractToken;
    narrow: {
      column: VanillaExtractUtility;
      start: VanillaExtractToken;
      end: VanillaExtractToken;
      span: { oneHalf: VanillaExtractToken };
      offset: VanillaExtractUtility;
      offsetBase: VanillaExtractToken;
      offsetS: VanillaExtractToken;
      offsetXXL: VanillaExtractToken;
    };
    basic: {
      column: VanillaExtractUtility;
      start: VanillaExtractToken;
      end: VanillaExtractToken;
      span: { oneHalf: VanillaExtractToken; oneThird: VanillaExtractToken; twoThirds: VanillaExtractToken };
      offset: VanillaExtractUtility;
      offsetBase: VanillaExtractToken;
      offsetS: VanillaExtractToken;
      offsetXXL: VanillaExtractToken;
    };
    extended: {
      column: VanillaExtractUtility;
      start: VanillaExtractToken;
      end: VanillaExtractToken;
      span: { oneHalf: VanillaExtractToken };
      offset: VanillaExtractUtility;
      offsetBase: VanillaExtractToken;
      offsetS: VanillaExtractToken;
      offsetXXL: VanillaExtractToken;
    };
    wide: {
      column: VanillaExtractUtility;
      start: VanillaExtractToken;
      end: VanillaExtractToken;
      offset: VanillaExtractUtility;
      offsetBase: VanillaExtractToken;
      offsetS: VanillaExtractToken;
      offsetXXL: VanillaExtractToken;
    };
    full: {
      column: VanillaExtractUtility;
      start: VanillaExtractToken;
      end: VanillaExtractToken;
      offset: VanillaExtractToken;
    };
  };
};
