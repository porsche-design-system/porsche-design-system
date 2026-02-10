import * as fs from 'node:fs';
import {
  blurFrosted,
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
  colorBackdrop,
  colorBackdropLight,
  colorCanvas,
  colorCanvasLight,
  colorContrastHigh,
  colorContrastHigher,
  colorContrastHigherLight,
  colorContrastHighLight,
  colorContrastLow,
  colorContrastLower,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorContrastMedium,
  colorContrastMediumLight,
  colorError,
  colorErrorFrosted,
  colorErrorFrostedLight,
  colorErrorFrostedSoft,
  colorErrorFrostedSoftLight,
  colorErrorLight,
  colorErrorLow,
  colorErrorLowLight,
  colorErrorMedium,
  colorErrorMediumLight,
  colorFocus,
  colorFocusLight,
  colorFrosted,
  colorFrostedLight,
  colorFrostedSoft,
  colorFrostedSoftLight,
  colorFrostedStrong,
  colorFrostedStrongLight,
  colorInfo,
  colorInfoFrosted,
  colorInfoFrostedLight,
  colorInfoFrostedSoft,
  colorInfoFrostedSoftLight,
  colorInfoLight,
  colorInfoLow,
  colorInfoLowLight,
  colorInfoMedium,
  colorInfoMediumLight,
  colorPrimary,
  colorPrimaryLight,
  colorSuccess,
  colorSuccessFrosted,
  colorSuccessFrostedLight,
  colorSuccessFrostedSoft,
  colorSuccessFrostedSoftLight,
  colorSuccessLight,
  colorSuccessLow,
  colorSuccessLowLight,
  colorSuccessMedium,
  colorSuccessMediumLight,
  colorSurface,
  colorSurfaceLight,
  colorWarning,
  colorWarningFrosted,
  colorWarningFrostedLight,
  colorWarningFrostedSoftDark,
  colorWarningFrostedSoftLight,
  colorWarningLight,
  colorWarningLow,
  colorWarningLowLight,
  colorWarningMedium,
  colorWarningMediumLight,
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
  fontPorscheNext,
  fontWeightBold,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  radius2Xl,
  radius3Xl,
  radius4Xl,
  radiusFull,
  radiusLg,
  radiusMd,
  radiusSm,
  radiusXl,
  radiusXs,
  shadowLg,
  shadowMd,
  shadowSm,
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
  typescale2Xl,
  typescale2Xs,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '@porsche-design-system/tokens';
import * as prettier from 'prettier';

export const buildVariablesCss = async (): Promise<void> => {
  const styles = `:root {
  --p-color-focus: ${colorFocus};
  --p-color-canvas: ${colorCanvas};
  --p-color-surface: ${colorSurface};
  --p-color-frosted: ${colorFrosted};
  --p-color-frosted-soft: ${colorFrostedSoft};
  --p-color-frosted-strong: ${colorFrostedStrong};
  --p-color-backdrop: ${colorBackdrop};
  --p-color-contrast-lower: ${colorContrastLower};
  --p-color-contrast-low: ${colorContrastLow};
  --p-color-contrast-medium: ${colorContrastMedium};
  --p-color-contrast-high: ${colorContrastHigh};
  --p-color-contrast-higher: ${colorContrastHigher};
  --p-color-primary: ${colorPrimary};
  --p-color-success: ${colorSuccess};
  --p-color-success-low: ${colorSuccessLow};
  --p-color-success-medium: ${colorSuccessMedium};
  --p-color-success-frosted: ${colorSuccessFrosted};
  --p-color-success-frosted-soft: ${colorSuccessFrostedSoft};
  --p-color-warning: ${colorWarning};
  --p-color-warning-low: ${colorWarningLow};
  --p-color-warning-medium: ${colorWarningMedium};
  --p-color-warning-frosted: ${colorWarningFrosted};
  --p-color-warning-frosted-soft: ${colorWarningFrostedSoftDark};
  --p-color-error: ${colorError};
  --p-color-error-low: ${colorErrorLow};
  --p-color-error-medium: ${colorErrorMedium};
  --p-color-error-frosted: ${colorErrorFrosted};
  --p-color-error-frosted-soft: ${colorErrorFrostedSoft};
  --p-color-info: ${colorInfo};
  --p-color-info-low: ${colorInfoLow};
  --p-color-info-medium: ${colorInfoMedium};
  --p-color-info-frosted: ${colorInfoFrosted};
  --p-color-info-frosted-soft: ${colorInfoFrostedSoft};

  --p-font-porsche-next: ${fontPorscheNext};

  --p-font-weight-normal: ${fontWeightNormal};
  --p-font-weight-semibold: ${fontWeightSemibold};
  --p-font-weight-bold: ${fontWeightBold};

  --p-leading-normal: ${leadingNormal};

  --p-typescale-2xs: ${typescale2Xs};
  --p-typescale-xs: ${typescaleXs};
  --p-typescale-sm: ${typescaleSm};
  --p-typescale-md: ${typescaleMd};
  --p-typescale-lg: ${typescaleLg};
  --p-typescale-xl: ${typescaleXl};
  --p-typescale-2xl: ${typescale2Xl};

  --p-breakpoint-xs: ${breakpointXs}px;
  --p-breakpoint-sm: ${breakpointSm}px;
  --p-breakpoint-md: ${breakpointMd}px;
  --p-breakpoint-lg: ${breakpointLg}px;
  --p-breakpoint-xl: ${breakpointXl}px;
  --p-breakpoint-2xl: ${breakpoint2Xl}px;

  --p-spacing-fluid-xs: ${spacingFluidXs};
  --p-spacing-fluid-sm: ${spacingFluidSm};
  --p-spacing-fluid-md: ${spacingFluidMd};
  --p-spacing-fluid-lg: ${spacingFluidLg};
  --p-spacing-fluid-xl: ${spacingFluidXl};
  --p-spacing-fluid-2xl: ${spacingFluid2Xl};

  --p-spacing-static-xs: ${spacingStaticXs};
  --p-spacing-static-sm: ${spacingStaticSm};
  --p-spacing-static-md: ${spacingStaticMd};
  --p-spacing-static-lg: ${spacingStaticLg};
  --p-spacing-static-xl: ${spacingStaticXl};
  --p-spacing-static-2xl: ${spacingStatic2Xl};

  --p-radius-xs: ${radiusXs};
  --p-radius-sm: ${radiusSm};
  --p-radius-md: ${radiusMd};
  --p-radius-lg: ${radiusLg};
  --p-radius-xl: ${radiusXl};
  --p-radius-2xl: ${radius2Xl};
  --p-radius-3xl: ${radius3Xl};
  --p-radius-4xl: ${radius4Xl};
  --p-radius-full: ${radiusFull};

  --p-blur-frosted: ${blurFrosted};

  --p-shadow-sm: ${shadowSm};
  --p-shadow-md: ${shadowMd};
  --p-shadow-lg: ${shadowLg};

  --p-ease-in-out: ${easeInOut};
  --p-ease-in: ${easeIn};
  --p-ease-out: ${easeOut};

  --p-duration-sm: ${durationSm};
  --p-duration-md: ${durationMd};
  --p-duration-lg: ${durationLg};
  --p-duration-xl: ${durationXl};
}

@supports not (color: light-dark(white, black)) {
  :root {
    --color-focus: ${colorFocusLight};
    --color-canvas: ${colorCanvasLight};
    --color-surface: ${colorSurfaceLight};
    --color-frosted: ${colorFrostedLight};
    --color-frosted-soft: ${colorFrostedSoftLight};
    --color-frosted-strong: ${colorFrostedStrongLight};
    --color-backdrop: ${colorBackdropLight};
    --color-contrast-lower: ${colorContrastLowerLight};
    --color-contrast-low: ${colorContrastLowLight};
    --color-contrast-medium: ${colorContrastMediumLight};
    --color-contrast-high: ${colorContrastHighLight};
    --color-contrast-higher: ${colorContrastHigherLight};
    --color-primary: ${colorPrimaryLight};
    --color-success: ${colorSuccessLight};
    --color-success-low: ${colorSuccessLowLight};
    --color-success-medium: ${colorSuccessMediumLight};
    --color-success-frosted: ${colorSuccessFrostedLight};
    --color-success-frosted-soft: ${colorSuccessFrostedSoftLight};
    --color-warning: ${colorWarningLight};
    --color-warning-low: ${colorWarningLowLight};
    --color-warning-medium: ${colorWarningMediumLight};
    --color-warning-frosted: ${colorWarningFrostedLight};
    --color-warning-frosted-soft: ${colorWarningFrostedSoftLight};
    --color-error: ${colorErrorLight};
    --color-error-low: ${colorErrorLowLight};
    --color-error-medium: ${colorErrorMediumLight};
    --color-error-frosted: ${colorErrorFrostedLight};
    --color-error-frosted-soft: ${colorErrorFrostedSoftLight};
    --color-info: ${colorInfoLight};
    --color-info-low: ${colorInfoLowLight};
    --color-info-medium: ${colorInfoMediumLight};
    --color-info-frosted: ${colorInfoFrostedLight};
    --color-info-frosted-soft: ${colorInfoFrostedSoftLight};
  }
}
`;

  const targetPath = './dist';
  const targetFile = 'variables.css';
  const variables = await prettier.format(styles, { parser: 'css' });

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, variables);

  console.log(`Built Variables CSS`);
};

(async () => {
  await buildVariablesCss();
})();
