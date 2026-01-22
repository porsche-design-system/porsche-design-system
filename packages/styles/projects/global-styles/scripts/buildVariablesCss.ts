import * as fs from 'node:fs';
import {
  prefixedCssVariableDefinitionDark,
  prefixedCssVariableDefinitionLight,
} from '@porsche-design-system/shared-styles';
import {
  borderRadius2Xl,
  borderRadius3Xl,
  borderRadius4Xl,
  borderRadiusFull,
  borderRadiusLg,
  borderRadiusMd,
  borderRadiusSm,
  borderRadiusXl,
  borderRadiusXs,
  fontFamilyPorscheNext,
  fontLineHeightNormal,
  fontSize2Xl,
  fontSize2Xs,
  fontSizeLg,
  fontSizeMd,
  fontSizeSm,
  fontSizeXl,
  fontSizeXs,
  fontWeightBold,
  fontWeightNormal,
  fontWeightSemiBold,
} from '@porsche-design-system/tokens';
import * as prettier from 'prettier';

export const buildVariablesCss = async () => {
  const styles = `:root {
  ${prefixedCssVariableDefinitionLight}

  --p-font-porsche-next: ${fontFamilyPorscheNext};

  --p-font-weight-normal: ${fontWeightNormal};
  --p-font-weight-semibold: ${fontWeightSemiBold};
  --p-font-weight-bold: ${fontWeightBold};

  --p-leading-normal: ${fontLineHeightNormal};

  --p-text-2xs: ${fontSize2Xs};
  --p-text-xs: ${fontSizeXs};
  --p-text-sm: ${fontSizeSm};
  --p-text-md: ${fontSizeMd};
  --p-text-lg: ${fontSizeLg};
  --p-text-xl: ${fontSizeXl};
  --p-text-2xl: ${fontSize2Xl};

  --p-radius-xs: ${borderRadiusXs};
  --p-radius-sm: ${borderRadiusSm};
  --p-radius-md: ${borderRadiusMd};
  --p-radius-lg: ${borderRadiusLg};
  --p-radius-xl: ${borderRadiusXl};
  --p-radius-2xl: ${borderRadius2Xl};
  --p-radius-3xl: ${borderRadius3Xl};
  --p-radius-4xl: ${borderRadius4Xl};
  --p-radius-full: ${borderRadiusFull};
}
.light {
  ${prefixedCssVariableDefinitionLight}
}
.dark {
  ${prefixedCssVariableDefinitionDark}
}
.auto {
  @media (prefers-color-scheme: dark) {
    ${prefixedCssVariableDefinitionDark}
  }
}`;

  const targetPath = './dist';
  const targetFile = 'variables.css';
  const variables = await prettier.format(styles, { parser: 'css' });

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, variables);

  console.log(`Built Variables CSS`);
};

buildVariablesCss();
