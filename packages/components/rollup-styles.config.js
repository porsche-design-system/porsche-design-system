import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import * as globby from 'globby';
import * as path from 'path';
import * as fs from 'fs';
import { pascalCase } from 'change-case';
import { version } from './package.json';

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

const isDevBuild = process.env.PDS_IS_STAGING === '1';

const sharedPlugins = [
  replace({
    preventAssignment: true,
    ROLLUP_REPLACE_IS_STAGING: isDevBuild ? '"staging"' : '"production"',
    ROLLUP_REPLACE_VERSION: `"${version}"`,
    ROLLUP_REPLACE_CDN_BASE_URL: '"http://localhost:3001"',
    'process.env.NODE_ENV': '"production"',
  }),
  commonjs(),
  nodeResolve(),
];

export default [
  {
    input,
    output: {
      dir: outputDir,
      format: 'cjs',
    },
    plugins: [
      ...sharedPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: outputDir,
        include: ['src/**/*.ts'],
      }),
      generatePackageJson({
        baseContents: {
          main: 'styles-entry.js',
          module: 'esm/styles-entry.js',
          types: 'styles-entry.d.ts',
          sideEffects: false,
        },
      }),
    ],
  },
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
    },
    plugins: [
      ...sharedPlugins,
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
];
