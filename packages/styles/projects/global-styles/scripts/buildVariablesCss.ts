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
} from '@porsche-design-system/tokens';
import * as prettier from 'prettier';

export const buildVariablesCss = async () => {
  const styles = `:root {
  ${prefixedCssVariableDefinitionLight}

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
