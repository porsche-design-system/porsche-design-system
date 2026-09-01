export type VanillaExtractToken = {
  name: string;
  description: string;
  value: string | number;
};

export type VanillaExtractUtility = {
  name: string;
  description: string;
  styles: readonly unknown[] | Record<string, unknown> | ((...args: any[]) => unknown);
};

export type VanillaExtractNode = VanillaExtractToken | VanillaExtractUtility;

export type VanillaExtractBranch =
  | VanillaExtractNode
  | VanillaExtractBranch[]
  | { [key: string]: VanillaExtractBranch };

/**
 * Package-local cross-solution catalog contract; styling solutions still differ in shape.
 */
export type StylesMeta<TToken, TUtility> = {
  border: {
    radius: {
      xs: TToken;
      sm: TToken;
      md: TToken;
      lg: TToken;
      xl: TToken;
      '2xl': TToken;
      '3xl': TToken;
      '4xl': TToken;
      full: TToken;
    };
  };
  blur: {
    frosted: TToken;
  };
  breakpoint: {
    xs: TToken;
    sm: TToken;
    md: TToken;
    lg: TToken;
    xl: TToken;
    '2xl': TToken;
    breakpoint: TUtility;
    breakpoints: TUtility;
    breakpointBase: TToken;
  };
  color: {
    background: {
      canvas: TToken;
      surface: TToken;
      frosted: TToken;
      frostedSoft: TToken;
      frostedStrong: TToken;
      backdrop: TToken;
    };
    foreground: {
      primary: TToken;
      contrastHigher: TToken;
      contrastHigh: TToken;
      contrastMedium: TToken;
      contrastLow: TToken;
      contrastLower: TToken;
    };
    semantic: {
      info: TToken;
      infoMedium: TToken;
      infoLow: TToken;
      infoFrosted: TToken;
      infoFrostedSoft: TToken;
      success: TToken;
      successMedium: TToken;
      successLow: TToken;
      successFrosted: TToken;
      successFrostedSoft: TToken;
      warning: TToken;
      warningMedium: TToken;
      warningLow: TToken;
      warningFrosted: TToken;
      warningFrostedSoft: TToken;
      error: TToken;
      errorMedium: TToken;
      errorLow: TToken;
      errorFrosted: TToken;
      errorFrostedSoft: TToken;
    };
    a11y: {
      focus: TToken;
    };
    colorSchemeStyles: TUtility;
  };
  font: {
    family: {
      porscheNext: TToken;
      porscheNextZhHans: TToken;
      porscheNextZhHant: TToken;
      porscheNextJa: TToken;
      porscheNextKo: TToken;
    };
    weight: {
      normal: TToken;
      semibold: TToken;
      bold: TToken;
    };
    lineHeight: {
      normal: TToken;
    };
    size: {
      '2xs': TToken;
      xs: TToken;
      sm: TToken;
      md: TToken;
      lg: TToken;
      xl: TToken;
      '2xl': TToken;
      '3xl': TToken;
      '4xl': TToken;
      '5xl': TToken;
    };
    getCJKFontFamilyStyle: TUtility;
    fontHyphenationStyle: TUtility;
  };
  shadow: {
    sm: TToken;
    md: TToken;
    lg: TToken;
  };
  spacing: {
    fluid: {
      xs: TToken;
      sm: TToken;
      md: TToken;
      lg: TToken;
      xl: TToken;
      '2xl': TToken;
    };
    static: {
      '2xs': TToken;
      xs: TToken;
      sm: TToken;
      md: TToken;
      lg: TToken;
      xl: TToken;
      '2xl': TToken;
    };
  };
  motion: {
    duration: {
      sm: TToken;
      md: TToken;
      lg: TToken;
      xl: TToken;
    };
    ease: {
      inOut: TToken;
      in: TToken;
      out: TToken;
    };
  };
  gradient: {
    stopsFadeDark: TToken;
  };
  typography: {
    heading: {
      '5xl': TUtility;
      '4xl': TUtility;
      '3xl': TUtility;
      '2xl': TUtility;
      xl: TUtility;
      lg: TUtility;
      md: TUtility;
      sm: TUtility;
      xs: TUtility;
      '2xs': TUtility;
    };
    text: {
      '5xl': TUtility;
      '4xl': TUtility;
      '3xl': TUtility;
      '2xl': TUtility;
      xl: TUtility;
      lg: TUtility;
      md: TUtility;
      sm: TUtility;
      xs: TUtility;
      '2xs': TUtility;
    };
    // Kept as an empty group for 1:1 shape parity with `ScssMeta['typography'].display`.
    display: Record<string, never>;
  };
  skeleton: {
    getSkeletonStyle: TUtility;
    // vanilla-extract-specific export with no emotion/scss counterpart: the `keyframes` object passed
    // to vanilla-extract's `keyframes()`. Kept keyed by export name.
    skeletonKeyframes: TUtility;
  };
  focus: {
    getFocusVisibleStyle: TUtility;
  };
  mediaQuery: {
    getMediaQueryMax: TUtility;
    getMediaQueryMin: TUtility;
    getMediaQueryMinMax: TUtility;
  };
  // Grouped by grid area, aligned with `ScssMeta['grid']` / `TailwindMeta['grid']`. `template` is the
  // whole-grid layout, `gap` a token; each area carries its placement utility (`column`), line tokens
  // (`start`/`end`), per-area `span`s, the composed `offset` utility and its `offset{Base,S,XXL}` tokens.
  grid: {
    template: TUtility;
    gap: TToken;
    narrow: {
      column: TUtility;
      start: TToken;
      end: TToken;
      span: { oneHalf: TToken };
      offset: TUtility;
      offsetBase: TToken;
      offsetS: TToken;
      offsetXXL: TToken;
    };
    basic: {
      column: TUtility;
      start: TToken;
      end: TToken;
      span: { oneHalf: TToken; oneThird: TToken; twoThirds: TToken };
      offset: TUtility;
      offsetBase: TToken;
      offsetS: TToken;
      offsetXXL: TToken;
    };
    extended: {
      column: TUtility;
      start: TToken;
      end: TToken;
      span: { oneHalf: TToken };
      offset: TUtility;
      offsetBase: TToken;
      offsetS: TToken;
      offsetXXL: TToken;
    };
    wide: {
      column: TUtility;
      start: TToken;
      end: TToken;
      offset: TUtility;
      offsetBase: TToken;
      offsetS: TToken;
      offsetXXL: TToken;
    };
    full: {
      column: TUtility;
      start: TToken;
      end: TToken;
      offset: TToken;
    };
  };
};

/**
 * The documented single source of truth, shared with the storefront docs and LLM context: the
 * contract instantiated with this package's leaf types. Deprecation-free by construction — legacy
 * symbols stay public through the `src/<domain>/deprecated` barrels and are indexed from the
 * `@deprecated` annotations they already carry, never documented here. Token sub-groups adopt scss's
 * short keys; the full export name is preserved in each leaf's `name`.
 */
export type VanillaExtractMeta = StylesMeta<VanillaExtractToken, VanillaExtractUtility>;
