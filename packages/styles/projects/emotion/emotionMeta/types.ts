// The emotion meta model — the documented single source of truth these types validate. Leaves
// (`EmotionToken`, `EmotionUtility`) carry payloads; records and arrays only group. Mirrors the
// scss meta skeleton (`scss/src/types.ts`); a leaf's kind is recovered via `kindOf` (`./kind`).

/** A documented referenceable value (color, radius, breakpoint, font-size, …). */
export type EmotionToken = {
  name: string;
  description: string;
  value: string | number;
};

/** A documented applied style — an emotion style object or a function returning one
 *  (focus/mediaQuery/skeleton/typography helpers, grid styles, …). */
export type EmotionUtility = {
  name: string;
  description: string;
  styles: readonly unknown[] | Record<string, unknown> | ((...args: any[]) => unknown);
};

export type EmotionNode = EmotionToken | EmotionUtility;

/** Any branch of the meta tree: a leaf {@link EmotionNode}, an array, or a nested record. Only leaves carry payloads. */
export type EmotionBranch = EmotionNode | EmotionBranch[] | { [key: string]: EmotionBranch };

/**
 * The documented single source of truth, shared with the storefront docs and LLM context. A flat,
 * domain-keyed catalog mirroring `scssMeta`'s skeleton; each leaf's kind (`token` | `utility`) is
 * recoverable via `kindOf`. The catalog is deprecation-free (deprecated symbols stay public via the
 * `src/<domain>/deprecated` barrels but aren't documented). Token sub-groups adopt scss's short keys;
 * the full export name is preserved in each leaf's `name`.
 */
export type EmotionMeta = {
  border: {
    radius: {
      xs: EmotionToken;
      sm: EmotionToken;
      md: EmotionToken;
      lg: EmotionToken;
      xl: EmotionToken;
      '2xl': EmotionToken;
      '3xl': EmotionToken;
      '4xl': EmotionToken;
      full: EmotionToken;
    };
  };
  blur: {
    frosted: EmotionToken;
  };
  breakpoint: {
    xs: EmotionToken;
    sm: EmotionToken;
    md: EmotionToken;
    lg: EmotionToken;
    xl: EmotionToken;
    '2xl': EmotionToken;
    breakpoint: EmotionUtility;
    breakpoints: EmotionUtility;
    breakpointBase: EmotionToken;
  };
  color: {
    background: {
      canvas: EmotionToken;
      surface: EmotionToken;
      frosted: EmotionToken;
      frostedSoft: EmotionToken;
      frostedStrong: EmotionToken;
      backdrop: EmotionToken;
    };
    foreground: {
      primary: EmotionToken;
      contrastHigher: EmotionToken;
      contrastHigh: EmotionToken;
      contrastMedium: EmotionToken;
      contrastLow: EmotionToken;
      contrastLower: EmotionToken;
    };
    semantic: {
      info: EmotionToken;
      infoMedium: EmotionToken;
      infoLow: EmotionToken;
      infoFrosted: EmotionToken;
      infoFrostedSoft: EmotionToken;
      success: EmotionToken;
      successMedium: EmotionToken;
      successLow: EmotionToken;
      successFrosted: EmotionToken;
      successFrostedSoft: EmotionToken;
      warning: EmotionToken;
      warningMedium: EmotionToken;
      warningLow: EmotionToken;
      warningFrosted: EmotionToken;
      warningFrostedSoft: EmotionToken;
      error: EmotionToken;
      errorMedium: EmotionToken;
      errorLow: EmotionToken;
      errorFrosted: EmotionToken;
      errorFrostedSoft: EmotionToken;
    };
    a11y: {
      focus: EmotionToken;
    };
    colorSchemeStyles: EmotionUtility;
  };
  font: {
    family: {
      porscheNext: EmotionToken;
      porscheNextZhHans: EmotionToken;
      porscheNextZhHant: EmotionToken;
      porscheNextJa: EmotionToken;
      porscheNextKo: EmotionToken;
    };
    weight: {
      normal: EmotionToken;
      semibold: EmotionToken;
      bold: EmotionToken;
    };
    lineHeight: {
      normal: EmotionToken;
    };
    size: {
      '2xs': EmotionToken;
      xs: EmotionToken;
      sm: EmotionToken;
      md: EmotionToken;
      lg: EmotionToken;
      xl: EmotionToken;
      '2xl': EmotionToken;
      '3xl': EmotionToken;
      '4xl': EmotionToken;
      '5xl': EmotionToken;
    };
    getCJKFontFamilyStyle: EmotionUtility;
    fontHyphenationStyle: EmotionUtility;
  };
  shadow: {
    sm: EmotionToken;
    md: EmotionToken;
    lg: EmotionToken;
  };
  spacing: {
    fluid: {
      xs: EmotionToken;
      sm: EmotionToken;
      md: EmotionToken;
      lg: EmotionToken;
      xl: EmotionToken;
      '2xl': EmotionToken;
    };
    static: {
      '2xs': EmotionToken;
      xs: EmotionToken;
      sm: EmotionToken;
      md: EmotionToken;
      lg: EmotionToken;
      xl: EmotionToken;
      '2xl': EmotionToken;
    };
  };
  motion: {
    duration: {
      sm: EmotionToken;
      md: EmotionToken;
      lg: EmotionToken;
      xl: EmotionToken;
    };
    ease: {
      inOut: EmotionToken;
      in: EmotionToken;
      out: EmotionToken;
    };
  };
  gradient: {
    stopsFadeDark: EmotionToken;
  };
  typography: {
    heading: {
      '5xl': EmotionUtility;
      '4xl': EmotionUtility;
      '3xl': EmotionUtility;
      '2xl': EmotionUtility;
      xl: EmotionUtility;
      lg: EmotionUtility;
      md: EmotionUtility;
      sm: EmotionUtility;
      xs: EmotionUtility;
      '2xs': EmotionUtility;
    };
    text: {
      '5xl': EmotionUtility;
      '4xl': EmotionUtility;
      '3xl': EmotionUtility;
      '2xl': EmotionUtility;
      xl: EmotionUtility;
      lg: EmotionUtility;
      md: EmotionUtility;
      sm: EmotionUtility;
      xs: EmotionUtility;
      '2xs': EmotionUtility;
    };
    // Kept as an empty group for 1:1 shape parity with `ScssMeta['typography'].display`.
    display: Record<string, never>;
  };
  skeleton: {
    getSkeletonStyle: EmotionUtility;
  };
  focus: {
    getFocusVisibleStyle: EmotionUtility;
  };
  mediaQuery: {
    getMediaQueryMax: EmotionUtility;
    getMediaQueryMin: EmotionUtility;
    getMediaQueryMinMax: EmotionUtility;
  };
  // `ScssMeta['grid']` is a flat mixed array with no keyed skeleton to mirror, so emotion keeps its
  // current export-name-keyed shape and only applies the token/utility split.
  grid: {
    gridFull: EmotionUtility;
    gridBasic: EmotionUtility;
    gridBasicColumnEnd: EmotionToken;
    gridBasicColumnStart: EmotionToken;
    gridBasicOffset: EmotionUtility;
    gridBasicOffsetBase: EmotionToken;
    gridBasicOffsetS: EmotionToken;
    gridBasicOffsetXXL: EmotionToken;
    gridBasicSpanOneHalf: EmotionToken;
    gridBasicSpanOneThird: EmotionToken;
    gridBasicSpanTwoThirds: EmotionToken;
    gridExtended: EmotionUtility;
    gridExtendedColumnEnd: EmotionToken;
    gridExtendedColumnStart: EmotionToken;
    gridExtendedOffset: EmotionUtility;
    gridExtendedOffsetBase: EmotionToken;
    gridExtendedOffsetS: EmotionToken;
    gridExtendedOffsetXXL: EmotionToken;
    gridExtendedSpanOneHalf: EmotionToken;
    gridFullColumnEnd: EmotionToken;
    gridFullColumnStart: EmotionToken;
    gridFullOffset: EmotionToken;
    gridGap: EmotionToken;
    gridNarrow: EmotionUtility;
    gridNarrowColumnEnd: EmotionToken;
    gridNarrowColumnStart: EmotionToken;
    gridNarrowOffset: EmotionUtility;
    gridNarrowOffsetBase: EmotionToken;
    gridNarrowOffsetS: EmotionToken;
    gridNarrowOffsetXXL: EmotionToken;
    gridNarrowSpanOneHalf: EmotionToken;
    gridStyle: EmotionUtility;
    gridWide: EmotionUtility;
    gridWideColumnEnd: EmotionToken;
    gridWideColumnStart: EmotionToken;
    gridWideOffset: EmotionUtility;
    gridWideOffsetBase: EmotionToken;
    gridWideOffsetS: EmotionToken;
    gridWideOffsetXXL: EmotionToken;
  };
};
