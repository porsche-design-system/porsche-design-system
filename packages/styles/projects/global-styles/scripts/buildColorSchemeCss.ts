import * as fs from 'node:fs';
import {
  colorBackdropDark,
  colorBackdropLight,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastHighDark,
  colorContrastHigherDark,
  colorContrastHigherLight,
  colorContrastHighLight,
  colorContrastLowDark,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorContrastMediumDark,
  colorContrastMediumLight,
  colorErrorDark,
  colorErrorFrostedDark,
  colorErrorFrostedLight,
  colorErrorFrostedSoftDark,
  colorErrorFrostedSoftLight,
  colorErrorLight,
  colorErrorLowDark,
  colorErrorLowLight,
  colorErrorMediumDark,
  colorErrorMediumLight,
  colorFocusDark,
  colorFocusLight,
  colorFrostedDark,
  colorFrostedLight,
  colorFrostedSoftDark,
  colorFrostedSoftLight,
  colorFrostedStrongDark,
  colorFrostedStrongLight,
  colorInfoDark,
  colorInfoFrostedDark,
  colorInfoFrostedLight,
  colorInfoFrostedSoftDark,
  colorInfoFrostedSoftLight,
  colorInfoLight,
  colorInfoLowDark,
  colorInfoLowLight,
  colorInfoMediumDark,
  colorInfoMediumLight,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSuccessDark,
  colorSuccessFrostedDark,
  colorSuccessFrostedLight,
  colorSuccessFrostedSoftDark,
  colorSuccessFrostedSoftLight,
  colorSuccessLight,
  colorSuccessLowDark,
  colorSuccessLowLight,
  colorSuccessMediumDark,
  colorSuccessMediumLight,
  colorSurfaceDark,
  colorSurfaceLight,
  colorWarningDark,
  colorWarningFrostedDark,
  colorWarningFrostedLight,
  colorWarningFrostedSoftDark,
  colorWarningFrostedSoftLight,
  colorWarningLight,
  colorWarningLowDark,
  colorWarningLowLight,
  colorWarningMediumDark,
  colorWarningMediumLight,
} from '@porsche-design-system/tokens';
import * as prettier from 'prettier';

export const buildColorSchemeCss = async (): Promise<void> => {
  const styles = `
  .scheme-normal {
    color-scheme: normal;
  }
  .scheme-dark {
    color-scheme: dark;
  }
  .scheme-light {
    color-scheme: light;
  }
  .scheme-light-dark {
    color-scheme: light dark;
  }
  .scheme-only-dark {
    color-scheme: only dark;
  }
  .scheme-only-light {
    color-scheme: only light;
  }

  @supports not (color: light-dark(white, black)) {
    :root, .scheme-light, .scheme-only-light, .scheme-normal, .scheme-light-dark {
      --p-color-focus: ${colorFocusLight};
      --p-color-canvas: ${colorCanvasLight};
      --p-color-surface: ${colorSurfaceLight};
      --p-color-frosted: ${colorFrostedLight};
      --p-color-frosted-soft: ${colorFrostedSoftLight};
      --p-color-frosted-strong: ${colorFrostedStrongLight};
      --p-color-backdrop: ${colorBackdropLight};
      --p-color-contrast-lower: ${colorContrastLowerLight};
      --p-color-contrast-low: ${colorContrastLowLight};
      --p-color-contrast-medium: ${colorContrastMediumLight};
      --p-color-contrast-high: ${colorContrastHighLight};
      --p-color-contrast-higher: ${colorContrastHigherLight};
      --p-color-primary: ${colorPrimaryLight};
      --p-color-success: ${colorSuccessLight};
      --p-color-success-low: ${colorSuccessLowLight};
      --p-color-success-medium: ${colorSuccessMediumLight};
      --p-color-success-frosted: ${colorSuccessFrostedLight};
      --p-color-success-frosted-soft: ${colorSuccessFrostedSoftLight};
      --p-color-warning: ${colorWarningLight};
      --p-color-warning-low: ${colorWarningLowLight};
      --p-color-warning-medium: ${colorWarningMediumLight};
      --p-color-warning-frosted: ${colorWarningFrostedLight};
      --p-color-warning-frosted-soft: ${colorWarningFrostedSoftLight};
      --p-color-error: ${colorErrorLight};
      --p-color-error-low: ${colorErrorLowLight};
      --p-color-error-medium: ${colorErrorMediumLight};
      --p-color-error-frosted: ${colorErrorFrostedLight};
      --p-color-error-frosted-soft: ${colorErrorFrostedSoftLight};
      --p-color-info: ${colorInfoLight};
      --p-color-info-low: ${colorInfoLowLight};
      --p-color-info-medium: ${colorInfoMediumLight};
      --p-color-info-frosted: ${colorInfoFrostedLight};
      --p-color-info-frosted-soft: ${colorInfoFrostedSoftLight};
    }

    .scheme-dark, .scheme-only-dark {
      --p-color-focus: ${colorFocusDark};
      --p-color-canvas: ${colorCanvasDark};
      --p-color-surface: ${colorSurfaceDark};
      --p-color-frosted: ${colorFrostedDark};
      --p-color-frosted-soft: ${colorFrostedSoftDark};
      --p-color-frosted-strong: ${colorFrostedStrongDark};
      --p-color-backdrop: ${colorBackdropDark};
      --p-color-contrast-lower: ${colorContrastLowerDark};
      --p-color-contrast-low: ${colorContrastLowDark};
      --p-color-contrast-medium: ${colorContrastMediumDark};
      --p-color-contrast-high: ${colorContrastHighDark};
      --p-color-contrast-higher: ${colorContrastHigherDark};
      --p-color-primary: ${colorPrimaryDark};
      --p-color-success: ${colorSuccessDark};
      --p-color-success-low: ${colorSuccessLowDark};
      --p-color-success-medium: ${colorSuccessMediumDark};
      --p-color-success-frosted: ${colorSuccessFrostedDark};
      --p-color-success-frosted-soft: ${colorSuccessFrostedSoftDark};
      --p-color-warning: ${colorWarningDark};
      --p-color-warning-low: ${colorWarningLowDark};
      --p-color-warning-medium: ${colorWarningMediumDark};
      --p-color-warning-frosted: ${colorWarningFrostedDark};
      --p-color-warning-frosted-soft: ${colorWarningFrostedSoftDark};
      --p-color-error: ${colorErrorDark};
      --p-color-error-low: ${colorErrorLowDark};
      --p-color-error-medium: ${colorErrorMediumDark};
      --p-color-error-frosted: ${colorErrorFrostedDark};
      --p-color-error-frosted-soft: ${colorErrorFrostedSoftDark};
      --p-color-info: ${colorInfoDark};
      --p-color-info-low: ${colorInfoLowDark};
      --p-color-info-medium: ${colorInfoMediumDark};
      --p-color-info-frosted: ${colorInfoFrostedDark};
      --p-color-info-frosted-soft: ${colorInfoFrostedSoftDark};
    }

    @media (prefers-color-scheme: dark) {
      .scheme-light-dark {
        --p-color-focus: ${colorFocusDark};
        --p-color-canvas: ${colorCanvasDark};
        --p-color-surface: ${colorSurfaceDark};
        --p-color-frosted: ${colorFrostedDark};
        --p-color-frosted-soft: ${colorFrostedSoftDark};
        --p-color-frosted-strong: ${colorFrostedStrongDark};
        --p-color-backdrop: ${colorBackdropDark};
        --p-color-contrast-lower: ${colorContrastLowerDark};
        --p-color-contrast-low: ${colorContrastLowDark};
        --p-color-contrast-medium: ${colorContrastMediumDark};
        --p-color-contrast-high: ${colorContrastHighDark};
        --p-color-contrast-higher: ${colorContrastHigherDark};
        --p-color-primary: ${colorPrimaryDark};
        --p-color-success: ${colorSuccessDark};
        --p-color-success-low: ${colorSuccessLowDark};
        --p-color-success-medium: ${colorSuccessMediumDark};
        --p-color-success-frosted: ${colorSuccessFrostedDark};
        --p-color-success-frosted-soft: ${colorSuccessFrostedSoftDark};
        --p-color-warning: ${colorWarningDark};
        --p-color-warning-low: ${colorWarningLowDark};
        --p-color-warning-medium: ${colorWarningMediumDark};
        --p-color-warning-frosted: ${colorWarningFrostedDark};
        --p-color-warning-frosted-soft: ${colorWarningFrostedSoftDark};
        --p-color-error: ${colorErrorDark};
        --p-color-error-low: ${colorErrorLowDark};
        --p-color-error-medium: ${colorErrorMediumDark};
        --p-color-error-frosted: ${colorErrorFrostedDark};
        --p-color-error-frosted-soft: ${colorErrorFrostedSoftDark};
        --p-color-info: ${colorInfoDark};
        --p-color-info-low: ${colorInfoLowDark};
        --p-color-info-medium: ${colorInfoMediumDark};
        --p-color-info-frosted: ${colorInfoFrostedDark};
        --p-color-info-frosted-soft: ${colorInfoFrostedSoftDark};
      }
    }
  }`;

  const targetPath = './dist';
  const targetFile = 'color-scheme.css';
  const colorScheme = await prettier.format(styles, { parser: 'css' });

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, colorScheme);

  console.log(`Built Color Scheme CSS`);
};

(async () => {
  await buildColorSchemeCss();
})();
