import * as fs from 'node:fs';
import * as path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { pascalCase } from 'change-case';
import { globbySync } from 'globby';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import pkgJson from './package.json' with { type: 'json' };

const outputDir = 'dist/styles';
const input = 'src/styles-entry.ts';

const generateStylesEntryFile = () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const componentsDir = path.resolve(__dirname, 'src/components');
  const stylesPaths = globbySync(`${componentsDir}/**/*-styles.ts`).sort();

  const stylesExports = stylesPaths
    .map((utilPath) => {
      const isCommonComponent = utilPath.includes('/components/common/');
      const styleExport = isCommonComponent
        ? '*'
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
    ROLLUP_REPLACE_VERSION: `"${pkgJson.version}"`,
    ROLLUP_REPLACE_CDN_BASE_URL: isDevBuild
      ? '"http://localhost:3001"'
      : '"./assets"', // global (not window!) because this is used during SSR on server side in nodejs
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
