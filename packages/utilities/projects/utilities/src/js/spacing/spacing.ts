export const spacingStaticXSmall = '4px';
export const spacingStaticSmall = '8px';
export const spacingStaticMedium = '16px';
export const spacingStaticLarge = '32px';
export const spacingStaticXLarge = '48px';
export const spacingStaticXXLarge = '80px';

export const spacingFluidXSmall = 'clamp(.25rem, 0.28vw + 0.19rem, .5rem)';
export const spacingFluidSmall = '.75rem';
export const spacingFluidMedium = 'clamp(2rem, 0.56vw + 1.89rem, 2.5rem)';
export const spacingFluidLarge = 'clamp(3.5rem, 2.22vw + 3.06rem, 5.5rem)';
export const spacingFluidXLarge = 'clamp(3.5rem, 2.22vw + 3.06rem, 5.5rem)';

export const spacingStatic = {
  xSmall: spacingStaticXSmall,
  small: spacingStaticSmall,
  medium: spacingStaticMedium,
  large: spacingStaticLarge,
  xLarge: spacingStaticXLarge,
  xxLarge: spacingStaticXXLarge,
};

export const spacingFluid = {
  xSmall: spacingFluidXSmall,
  small: spacingFluidSmall,
  medium: spacingFluidMedium,
  large: spacingFluidLarge,
  xLarge: spacingFluidXLarge,
};

export const spacing = {
  static: spacingStatic,
  fluid: spacingFluid,
};
