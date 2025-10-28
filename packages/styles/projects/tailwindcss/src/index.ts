import {
  blurFrosted,
  borderRadiusLg,
  borderRadiusMd,
  borderRadiusSm,
  borderWidthRegular,
  borderWidthThin,
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
  colorCanvasDark,
  colorCanvasInvertedDark,
  colorCanvasInvertedLight,
  colorCanvasLight,
  colorContrast10Dark,
  colorContrast10Light,
  colorContrast20Dark,
  colorContrast20Light,
  colorContrast30Dark,
  colorContrast30Light,
  colorContrast40Dark,
  colorContrast40Light,
  colorContrast50Dark,
  colorContrast50Light,
  colorContrast60Dark,
  colorContrast60Light,
  colorContrast70Dark,
  colorContrast70Light,
  colorContrast80Dark,
  colorContrast80Light,
  colorContrast90Dark,
  colorContrast90Light,
  colorErrorDark,
  colorErrorLight,
  colorErrorSoftDark,
  colorErrorSoftLight,
  colorFocusDark,
  colorFocusLight,
  colorFrostedDark,
  colorFrostedLight,
  colorInfoDark,
  colorInfoLight,
  colorInfoSoftDark,
  colorInfoSoftLight,
  colorPrimaryDark,
  colorPrimaryInvertedDark,
  colorPrimaryInvertedLight,
  colorPrimaryLight,
  colorScrimDark,
  colorScrimLight,
  colorSuccessDark,
  colorSuccessLight,
  colorSuccessSoftDark,
  colorSuccessSoftLight,
  colorSurfaceDark,
  colorSurfaceLight,
  colorWarningDark,
  colorWarningLight,
  colorWarningSoftDark,
  colorWarningSoftLight,
  fontFamily,
  fontLineHeight,
  fontSize2Xl,
  fontSize2Xs,
  fontSizeLg,
  fontSizeMd,
  fontSizeSm,
  fontSizeXl,
  fontSizeXs,
  fontWeightBold,
  fontWeightRegular,
  fontWeightSemiBold,
  gradientFade,
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionDurationVeryLong,
  motionEaseIn,
  motionEaseInOut,
  motionEaseOut,
  shadowHigh,
  shadowLow,
  shadowMedium,
  spacingFluid2Xl,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXl,
  spacingFluidXs,
  spacingStatic2Xl,
  spacingStaticLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXl,
  spacingStaticXs,
} from '@porsche-design-system/tokens';

export const tailwindcssTheme = `@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Color */
  --color-canvas: ${colorCanvasLight};
  --color-canvas-inverted: ${colorCanvasInvertedLight};
  --color-surface: ${colorSurfaceLight};
  --color-frosted: ${colorFrostedLight};
  --color-scrim: ${colorScrimLight};
  --color-contrast-10: ${colorContrast10Light};
  --color-contrast-20: ${colorContrast20Light};
  --color-contrast-30: ${colorContrast30Light};
  --color-contrast-40: ${colorContrast40Light};
  --color-contrast-50: ${colorContrast50Light};
  --color-contrast-60: ${colorContrast60Light};
  --color-contrast-70: ${colorContrast70Light};
  --color-contrast-80: ${colorContrast80Light};
  --color-contrast-90: ${colorContrast90Light};
  --color-primary: ${colorPrimaryLight};
  --color-primary-inverted: ${colorPrimaryInvertedLight};
  --color-success: ${colorSuccessLight};
  --color-success-soft: ${colorSuccessSoftLight};
  --color-warning: ${colorWarningLight};
  --color-warning-soft: ${colorWarningSoftLight};
  --color-error: ${colorErrorLight};
  --color-error-soft: ${colorErrorSoftLight};
  --color-info: ${colorInfoLight};
  --color-info-soft: ${colorInfoSoftLight};
  --color-focus: ${colorFocusLight};
  --color-skeleton: #f7f7f7;

  --color-canvas-light: ${colorCanvasLight};
  --color-canvas-inverted-light: ${colorCanvasInvertedLight};
  --color-surface-light: ${colorSurfaceLight};
  --color-frosted-light: ${colorFrostedLight};
  --color-scrim-light: ${colorScrimLight};
  --color-contrast-10-light: ${colorContrast10Light};
  --color-contrast-20-light: ${colorContrast20Light};
  --color-contrast-30-light: ${colorContrast30Light};
  --color-contrast-40-light: ${colorContrast40Light};
  --color-contrast-50-light: ${colorContrast50Light};
  --color-contrast-60-light: ${colorContrast60Light};
  --color-contrast-70-light: ${colorContrast70Light};
  --color-contrast-80-light: ${colorContrast80Light};
  --color-contrast-90-light: ${colorContrast90Light};
  --color-primary-light: ${colorPrimaryLight};
  --color-primary-inverted-light: ${colorPrimaryInvertedLight};
  --color-success-light: ${colorSuccessLight};
  --color-success-soft-light: ${colorSuccessSoftLight};
  --color-warning-light: ${colorWarningLight};
  --color-warning-soft-light: ${colorWarningSoftLight};
  --color-error-light: ${colorErrorLight};
  --color-error-soft-light: ${colorErrorSoftLight};
  --color-info-light: ${colorInfoLight};
  --color-info-soft-light: ${colorInfoSoftLight};
  --color-focus-light: ${colorFocusLight};
  --color-skeleton-light: #f7f7f7;

  --color-canvas-dark: ${colorCanvasDark};
  --color-canvas-inverted-dark: ${colorCanvasInvertedDark};
  --color-surface-dark: ${colorSurfaceDark};
  --color-frosted-dark: ${colorFrostedDark};
  --color-scrim-dark: ${colorScrimDark};
  --color-contrast-10-dark: ${colorContrast10Dark};
  --color-contrast-20-dark: ${colorContrast20Dark};
  --color-contrast-30-dark: ${colorContrast30Dark};
  --color-contrast-40-dark: ${colorContrast40Dark};
  --color-contrast-50-dark: ${colorContrast50Dark};
  --color-contrast-60-dark: ${colorContrast60Dark};
  --color-contrast-70-dark: ${colorContrast70Dark};
  --color-contrast-80-dark: ${colorContrast80Dark};
  --color-contrast-90-dark: ${colorContrast90Dark};
  --color-primary-dark: ${colorPrimaryDark};
  --color-primary-inverted-dark: ${colorPrimaryInvertedDark};
  --color-success-dark: ${colorSuccessDark};
  --color-success-soft-dark: ${colorSuccessSoftDark};
  --color-warning-dark: ${colorWarningDark};
  --color-warning-soft-dark: ${colorWarningSoftDark};
  --color-error-dark: ${colorErrorDark};
  --color-error-soft-dark: ${colorErrorSoftDark};
  --color-info-dark: ${colorInfoDark};
  --color-info-soft-dark: ${colorInfoSoftDark};
  --color-focus-dark: ${colorFocusDark};
  --color-skeleton-dark: #1a1b1e;

  /* Typography */
  --font-porsche-next: ${fontFamily};

  --font-weight-normal: ${fontWeightRegular};
  --font-weight-semibold: ${fontWeightSemiBold};
  --font-weight-bold: ${fontWeightBold};

  --leading-normal: ${fontLineHeight};

  --text-2xs: ${fontSize2Xs};
  --text-2xs--line-height: ${fontLineHeight};
  --text-xs: ${fontSizeXs};
  --text-xs--line-height: ${fontLineHeight};
  --text-base: ${fontSizeSm};
  --text-base--line-height: ${fontLineHeight};
  --text-sm: ${fontSizeSm};
  --text-sm--line-height: ${fontLineHeight};
  --text-md: ${fontSizeMd};
  --text-md--line-height: ${fontLineHeight};
  --text-lg: ${fontSizeLg};
  --text-lg--line-height: ${fontLineHeight};
  --text-xl: ${fontSizeXl};
  --text-xl--line-height: ${fontLineHeight};
  --text-2xl: ${fontSize2Xl};
  --text-2xl--line-height: ${fontLineHeight};

  /* Breakpoint */
  --breakpoint-xs: ${breakpointXs}px;
  --breakpoint-sm: ${breakpointSm}px;
  --breakpoint-md: ${breakpointMd}px;
  --breakpoint-lg: ${breakpointLg}px;
  --breakpoint-xl: ${breakpointXl}px;
  --breakpoint-2xl: ${breakpoint2Xl}px;

  /* Spacing */
  --spacing: .25rem;

  --spacing-fluid-xs: ${spacingFluidXs};
  --spacing-fluid-sm: ${spacingFluidSm};
  --spacing-fluid-md: ${spacingFluidMd};
  --spacing-fluid-lg: ${spacingFluidLg};
  --spacing-fluid-xl: ${spacingFluidXl};
  --spacing-fluid-2xl: ${spacingFluid2Xl};

  --spacing-static-xs: ${spacingStaticXs};
  --spacing-static-sm: ${spacingStaticSm};
  --spacing-static-md: ${spacingStaticMd};
  --spacing-static-lg: ${spacingStaticLg};
  --spacing-static-xl: ${spacingStaticXl};
  --spacing-static-2xl: ${spacingStatic2Xl};

  /* Border */
  --radius-sm: ${borderRadiusSm};
  --radius-md: ${borderRadiusMd};
  --radius-lg: ${borderRadiusLg};

  --default-border-width: ${borderWidthRegular};
  --border-width-regular: ${borderWidthRegular};
  --border-width-thin: ${borderWidthThin};

  /* Blur */
  --blur-frosted: ${blurFrosted.replace(/blur\((.*)\)/, '$1')};

  /* Shadow */
  --shadow-low: ${shadowLow};
  --shadow-medium: ${shadowMedium};
  --shadow-high: ${shadowHigh};

  /* Outline */
  --default-outline-width: ${borderWidthRegular};

  /* Motion */
  --default-transition-timing-function: ${motionEaseInOut};
  --ease-in-out: ${motionEaseInOut};
  --ease-in: ${motionEaseIn};
  --ease-out: ${motionEaseOut};

  --default-transition-duration: ${motionDurationShort};
  --transition-duration-short: ${motionDurationShort};
  --transition-duration-moderate: ${motionDurationModerate};
  --transition-duration-long: ${motionDurationLong};
  --transition-duration-very-long: ${motionDurationVeryLong};

  /* Animation */
  --animate-skeleton: skeleton var(--transition-duration-long) var(--ease-in-out) infinite;

  @keyframes skeleton {
    from {
      background-position-x: 100%;
    }
    to {
      background-position-x: -100%;
    }
  }
}

@layer theme {
  .light {
    --color-canvas: ${colorCanvasLight};
    --color-canvas-inverted: ${colorCanvasInvertedLight};
    --color-surface: ${colorSurfaceLight};
    --color-frosted: ${colorFrostedLight};
    --color-scrim: ${colorScrimLight};
    --color-contrast-10: ${colorContrast10Light};
    --color-contrast-20: ${colorContrast20Light};
    --color-contrast-30: ${colorContrast30Light};
    --color-contrast-40: ${colorContrast40Light};
    --color-contrast-50: ${colorContrast50Light};
    --color-contrast-60: ${colorContrast60Light};
    --color-contrast-70: ${colorContrast70Light};
    --color-contrast-80: ${colorContrast80Light};
    --color-contrast-90: ${colorContrast90Light};
    --color-primary: ${colorPrimaryLight};
    --color-primary-inverted: ${colorPrimaryInvertedLight};
    --color-success: ${colorSuccessLight};
    --color-success-soft: ${colorSuccessSoftLight};
    --color-warning: ${colorWarningLight};
    --color-warning-soft: ${colorWarningSoftLight};
    --color-error: ${colorErrorLight};
    --color-error-soft: ${colorErrorSoftLight};
    --color-info: ${colorInfoLight};
    --color-info-soft: ${colorInfoSoftLight};
    --color-focus: ${colorFocusLight};
    --color-skeleton: #f7f7f7;
  }

  .dark {
    --color-canvas: ${colorCanvasDark};
    --color-canvas-inverted: ${colorCanvasInvertedDark};
    --color-surface: ${colorSurfaceDark};
    --color-frosted: ${colorFrostedDark};
    --color-scrim: ${colorScrimDark};
    --color-contrast-10: ${colorContrast10Dark};
    --color-contrast-20: ${colorContrast20Dark};
    --color-contrast-30: ${colorContrast30Dark};
    --color-contrast-40: ${colorContrast40Dark};
    --color-contrast-50: ${colorContrast50Dark};
    --color-contrast-60: ${colorContrast60Dark};
    --color-contrast-70: ${colorContrast70Dark};
    --color-contrast-80: ${colorContrast80Dark};
    --color-contrast-90: ${colorContrast90Dark};
    --color-primary: ${colorPrimaryDark};
    --color-primary-inverted: ${colorPrimaryInvertedDark};
    --color-success: ${colorSuccessDark};
    --color-success-soft: ${colorSuccessSoftDark};
    --color-warning: ${colorWarningDark};
    --color-warning-soft: ${colorWarningSoftDark};
    --color-error: ${colorErrorDark};
    --color-error-soft: ${colorErrorSoftDark};
    --color-info: ${colorInfoDark};
    --color-info-soft: ${colorInfoSoftDark};
    --color-focus: ${colorFocusDark};
    --color-skeleton: #1a1b1e;
  }

  .auto {
    @media (prefers-color-scheme: dark) {
      --color-canvas: ${colorCanvasDark};
      --color-canvas-inverted: ${colorCanvasInvertedDark};
      --color-surface: ${colorSurfaceDark};
      --color-frosted: ${colorFrostedDark};
      --color-scrim: ${colorScrimDark};
      --color-contrast-10: ${colorContrast10Dark};
      --color-contrast-20: ${colorContrast20Dark};
      --color-contrast-30: ${colorContrast30Dark};
      --color-contrast-40: ${colorContrast40Dark};
      --color-contrast-50: ${colorContrast50Dark};
      --color-contrast-60: ${colorContrast60Dark};
      --color-contrast-70: ${colorContrast70Dark};
      --color-contrast-80: ${colorContrast80Dark};
      --color-contrast-90: ${colorContrast90Dark};
      --color-primary: ${colorPrimaryDark};
      --color-primary-inverted: ${colorPrimaryInvertedDark};
      --color-success: ${colorSuccessDark};
      --color-success-soft: ${colorSuccessSoftDark};
      --color-warning: ${colorWarningDark};
      --color-warning-soft: ${colorWarningSoftDark};
      --color-error: ${colorErrorDark};
      --color-error-soft: ${colorErrorSoftDark};
      --color-info: ${colorInfoDark};
      --color-info-soft: ${colorInfoSoftDark};
      --color-focus: ${colorFocusDark};
      --color-skeleton: #1a1b1e;
    }
  }
}

/* Gradient */
@utility bg-fade-to-t {
  @apply bg-linear-[to_top,${gradientFade.replaceAll(' ', '_')}];
}

@utility bg-fade-to-r {
  @apply bg-linear-[to_right,${gradientFade.replaceAll(' ', '_')}];
}

@utility bg-fade-to-b {
  @apply bg-linear-[to_bottom,${gradientFade.replaceAll(' ', '_')}];
}

@utility bg-fade-to-l {
  @apply bg-linear-[to_left,${gradientFade.replaceAll(' ', '_')}];
}

/* Grid */
@utility grid-template {
  @apply
    [--pds-internal-grid-safe-zone:max(22px,10.625vw-12px)]
    [--_pds-grid-col:minmax(0,var(--pds-internal-grid-outer-column,calc(var(--pds-internal-grid-safe-zone)-var(--spacing-fluid-md))))]
    grid
    grid-cols-[[full-start]_var(--_pds-grid-col)_[wide-start_extended-start_basic-start_narrow-start]_repeat(6,minmax(0,1fr))_[narrow-end_basic-end_extended-end_wide-end]_var(--_pds-grid-col)_[full-end]]
    gap-(--spacing-fluid-md)
    min-w-[var(--pds-internal-grid-width-min,320px)]
    max-w-[var(--pds-internal-grid-width-max,2560px)]
    box-content
    mx-(--pds-internal-grid-margin,0)
    px-[calc(50%-var(--pds-internal-grid-margin,0px)-2560px/2)]
    sm:[--pds-internal-grid-safe-zone:calc(5vw-16px)]
    sm:grid-cols-[[full-start]_var(--_pds-grid-col)_[wide-start]_minmax(0,1fr)_[extended-start]_minmax(0,1fr)_[basic-start]_repeat(2,minmax(0,1fr))_[narrow-start]_repeat(8,minmax(0,1fr))_[narrow-end]_repeat(2,minmax(0,1fr))_[basic-end]_minmax(0,1fr)_[extended-end]_minmax(0,1fr)_[wide-end]_var(--_pds-grid-col)[full-end]]
    2xl:[--pds-internal-grid-safe-zone:min(50vw-880px,400px)];
}

/* Grid: Area Narrow */
@utility col-narrow {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:4] col-[narrow];
}

@utility col-start-narrow {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:4] col-start-[narrow-start];
}

@utility col-end-narrow {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:4] col-end-[narrow-end];
}

/* Grid: Area Basic */
@utility col-basic {
  @apply [--_pds-grid-one-half:3] [--_pds-grid-one-third:2] [--_pds-grid-two-thirds:4] sm:[--_pds-grid-one-half:6] sm:[--_pds-grid-one-third:4] sm:[--_pds-grid-two-thirds:8] col-[basic];
}

@utility col-start-basic {
  @apply [--_pds-grid-one-half:3] [--_pds-grid-one-third:2] [--_pds-grid-two-thirds:4] sm:[--_pds-grid-one-half:6] sm:[--_pds-grid-one-third:4] sm:[--_pds-grid-two-thirds:8] col-start-[basic-start];
}

@utility col-end-basic {
  @apply [--_pds-grid-one-half:3] [--_pds-grid-one-third:2] [--_pds-grid-two-thirds:4] sm:[--_pds-grid-one-half:6] sm:[--_pds-grid-one-third:4] sm:[--_pds-grid-two-thirds:8] col-end-[basic-end];
}

/* Grid: Area Extended */
@utility col-extended {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:7] col-[extended];
}

@utility col-start-extended {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:7] col-start-[extended-start];
}

@utility col-end-extended {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:7] col-end-[extended-end];
}

/* Grid: Area Wide */
@utility col-wide {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:8] col-[wide];
}

@utility col-start-wide {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:8] col-start-[wide-start];
}

@utility col-end-wide {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:8] col-end-[wide-end];
}

/* Grid: Area Full */
@utility col-full {
  @apply col-[full];
}

@utility col-start-full {
  @apply col-start-[full-start];
}

@utility col-end-full {
  @apply col-end-[full-end];
}

/* Grid: Division */
@utility col-span-one-half {
  @apply col-span-(--_pds-grid-one-half,1);
}

@utility col-span-one-third {
  @apply col-span-(--_pds-grid-one-third,1);
}

@utility col-span-two-thirds {
  @apply col-span-(--_pds-grid-two-thirds,1);
}

/* Skeleton */
@utility skeleton {
  @apply animate-skeleton;
  @apply block rounded-sm;
  @apply bg-surface bg-[linear-gradient(to_right,transparent_0%,var(--color-skeleton)_20%,transparent_50%)] bg-position-[0_0] bg-size-[200%_100%];
}

/* Typography: Text */
@utility prose-text-2xs {
  @apply font-porsche-next not-italic font-normal text-2xs text-primary;
}
@utility prose-text-xs {
  @apply font-porsche-next not-italic font-normal text-xs text-primary;
}
@utility prose-text-sm {
  @apply font-porsche-next not-italic font-normal text-sm text-primary;
}
@utility prose-text-md {
  @apply font-porsche-next not-italic font-normal text-md text-primary;
}
@utility prose-text-lg {
  @apply font-porsche-next not-italic font-normal text-lg text-primary;
}
@utility prose-text-xl {
  @apply font-porsche-next not-italic font-normal text-xl text-primary;
}

/* Typography: Heading */
@utility prose-heading-sm {
  @apply font-porsche-next not-italic font-semibold text-sm text-primary;
}
@utility prose-heading-md {
  @apply font-porsche-next not-italic font-semibold text-md text-primary;
}
@utility prose-heading-lg {
  @apply font-porsche-next not-italic font-semibold text-lg text-primary;
}
@utility prose-heading-xl {
  @apply font-porsche-next not-italic font-semibold text-xl text-primary;
}
@utility prose-heading-2xl {
  @apply font-porsche-next not-italic font-semibold text-2xl text-primary;
}

/* Typography: Display */
@utility prose-display-sm {
  @apply font-porsche-next not-italic font-normal leading-normal text-primary text-[clamp(1.8rem,2.41vw+1.32rem,4.21rem)];
}
@utility prose-display-md {
  @apply font-porsche-next not-italic font-normal leading-normal text-primary text-[clamp(2.03rem,3.58vw+1.31rem,5.61rem)];
}
@utility prose-display-lg {
  @apply font-porsche-next not-italic font-normal leading-normal text-primary text-[clamp(2.28rem,5.2vw+1.24rem,7.48rem)];
}`;
