import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import * as globby from 'globby';
import * as path from 'path';
import * as fs from 'fs';
import { pascalCase } from 'change-case';

// TODO: why are there no typings produced?

const outputDir = 'dist/styles';
const input = 'src/styles-entry.ts';

const generateStylesEntryFile = () => {
  const componentsDir = path.resolve(__dirname, 'src/components');
  const stylesPaths = globby.sync(`${componentsDir}/**/*-styles.ts`).sort();

  const stylesExports = stylesPaths
    .map((utilPath) => {
      const isCommonComponent = utilPath.includes('/components/common/');
      const styleExport = isCommonComponent
        ? `*`
        : `{ getComponentCss as get${pascalCase(/([-a-z]+)-styles\.ts/.exec(utilPath)[1])}Css }`;
      const fromPath = `./components${utilPath.replace(componentsDir, '').replace(/\.ts$/, '')}`;

      return `export ${styleExport} from '${fromPath}';`;
    })
    .join('\n');

  const inputContent = `/* Auto Generated File */

${stylesExports}
`;

  fs.writeFileSync(path.resolve(__dirname, input), inputContent);
  console.log(`Successfully generated ${input}`);
};

generateStylesEntryFile();

export default {
  input,
  output: {
    dir: outputDir,
    format: 'esm',
  },
  plugins: [
    replace({
      ROLLUP_REPLACE_IS_STAGING: '"production"',
    }),
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: outputDir,
    }),
  ],
};
