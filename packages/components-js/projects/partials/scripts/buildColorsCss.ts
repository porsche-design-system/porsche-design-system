import {
  colorBackdropLight,
  colorCanvasLight,
  colorContrastHigherLight,
  colorContrastHighLight,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorContrastMediumLight,
  colorDisabledLight,
  colorErrorFrostedLight,
  colorErrorFrostedSoftLight,
  colorErrorLight,
  colorErrorLowLight,
  colorErrorMediumLight,
  colorFocusLight,
  colorFrostedLight,
  colorFrostedSoftLight,
  colorInfoFrostedLight,
  colorInfoFrostedSoftLight,
  colorInfoLight,
  colorInfoLowLight,
  colorInfoMediumLight,
  colorPrimaryLight,
  colorSuccessFrostedLight,
  colorSuccessFrostedSoftLight,
  colorSuccessLight,
  colorSuccessLowLight,
  colorSuccessMediumLight,
  colorSurfaceLight,
  colorWarningFrostedLight,
  colorWarningFrostedSoftLight,
  colorWarningLight,
  colorWarningLowLight,
  colorWarningMediumLight,
} from '@porsche-design-system/tokens';
import fs from 'fs';

// TODO: Share this from one place and also use in tailwindcss theme
const colors = `/* a11y */
--color-focus: ${colorFocusLight};
--color-disabled: ${colorDisabledLight};
/* background */
--color-canvas: ${colorCanvasLight};
--color-surface: ${colorSurfaceLight};
--color-frosted: ${colorFrostedLight};
--color-frosted-soft: ${colorFrostedSoftLight};
--color-backdrop: ${colorBackdropLight};
/* foreground */
--color-contrast-lower: ${colorContrastLowerLight};
--color-contrast-low: ${colorContrastLowLight};
--color-contrast-medium: ${colorContrastMediumLight};
--color-contrast-high: ${colorContrastHighLight};
--color-contrast-higher: ${colorContrastHigherLight};
--color-primary: ${colorPrimaryLight};
/* semantic */
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
/* special */
--color-skeleton: #f7f7f7;`;

export const buildColorsCss = () => {
  const styles = `
.light {
  ${colors}
}
.dark {
  ${colors}
}
.auto {
  @media (prefers-color-scheme: dark) {
    ${colors}
  }
}`;

  const stylesPrefixed = `
.p-light {
  ${colors}
}
.p-dark {
  ${colors}
}
.p-auto {
  @media (prefers-color-scheme: dark) {
    ${colors}
  }
}`;

  const targetPath = './dist';
  const targetFile = 'colors.css';
  const targetFilePrefixed = 'colors-prefixed.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, styles);
  fs.writeFileSync(`./${targetPath}/${targetFilePrefixed}`, stylesPrefixed);
};

buildColorsCss();
