import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import * as globby from 'globby';
import * as path from 'path';
import * as fs from 'fs';
import pkgJson from './package.json' assert { type: 'json' };
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const outputDir = 'dist/utils';
const input = 'src/utils-entry.ts';

const generateUtilsEntryFile = () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const componentsDir = path.resolve(__dirname, 'src/components');
  const utilsPaths = globby.sync(`${componentsDir}/**/*-utils.ts`).sort();

  const utilsExports = utilsPaths
    .map((utilPath) => `export * from './components${utilPath.replace(componentsDir, '').replace(/\.ts$/, '')}';`)
    .join('\n');

  const inputContent = `/* Auto Generated File */

export * from './utils';
${utilsExports}
`;

  fs.writeFileSync(path.resolve(__dirname, input), inputContent);
  console.log(`Successfully generated ${input}`);
};

generateUtilsEntryFile();

const isDevBuild = process.env.PDS_IS_STAGING === '1';

const sharedPlugins = [
  replace({
    preventAssignment: true,
    ROLLUP_REPLACE_IS_STAGING: isDevBuild ? '"staging"' : '"production"',
    ROLLUP_REPLACE_VERSION: `"${pkgJson.version}"`,
    ROLLUP_REPLACE_CDN_BASE_URL: isDevBuild
      ? '"http://localhost:3001"'
      : 'global.PORSCHE_DESIGN_SYSTEM_CDN_URL + "/porsche-design-system"', // global (not window!) because this is used during SSR on server side in nodejs
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
        verbatimModuleSyntax: false,
      }),
      generatePackageJson({
        baseContents: {
          main: 'utils-entry.js',
          module: 'esm/utils-entry.js',
          types: 'utils-entry.d.ts',
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
        verbatimModuleSyntax: false,
      }),
    ],
  },
];
