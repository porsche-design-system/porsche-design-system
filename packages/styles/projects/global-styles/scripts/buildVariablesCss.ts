import * as fs from 'node:fs';
import {
  prefixedCssVariableDefinitionDark,
  prefixedCssVariableDefinitionLight,
} from '@porsche-design-system/shared-styles';
import * as prettier from 'prettier';

export const buildVariablesCss = async () => {
  const styles = `:root {
  ${prefixedCssVariableDefinitionLight}
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
