import * as fs from 'node:fs';
import { colorVariablesDark, colorVariablesLight } from '@porsche-design-system/shared-styles';

export const buildVariablesCss = () => {
  const styles = `:root {
  ${colorVariablesLight}
}
.light {
  ${colorVariablesLight}
}
.dark {
  ${colorVariablesDark}
}
.auto {
  @media (prefers-color-scheme: dark) {
    ${colorVariablesDark}
  }
}`;

  const targetPath = './dist';
  const targetFile = 'variables.css';

  fs.mkdirSync(targetPath, { recursive: true });
  fs.writeFileSync(`./${targetPath}/${targetFile}`, styles);

  console.log(`Built Variables CSS`);
};

buildVariablesCss();
