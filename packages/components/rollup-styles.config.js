import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { terser } from 'rollup-plugin-terser';
import * as globby from 'globby';
import * as path from 'path';
import * as fs from 'fs';
import { pascalCase } from 'change-case';

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

const sharedPlugins = [
  replace({
    ROLLUP_REPLACE_IS_STAGING: '"production"',
    preventAssignment: true,
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
  // TODO: move ponyfill into partials or PorscheDesignSystemProvider
  {
    input: 'src/dsr-ponyfill.ts',
    output: {
      file: 'dist/dsr-ponyfill.min.js',
      format: 'esm',
    },
    plugins: [
      // remove check for ponyfill since our loader takes care of it
      replace({
        'if (hasNativeDeclarativeShadowRoots())': 'if (false)',
        delimiters: ['', ''],
        preventAssignment: true,
      }),
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        include: ['src/dsr-ponyfill.ts'],
      }),
      terser({
        output: {
          comments: false,
        },
      }),
    ],
  },
  {
    input: 'src/dsr-ponyfill-loader.ts',
    output: {
      file: 'dist/dsr-ponyfill-loader.min.js',
      format: 'iife',
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        include: ['src/dsr-ponyfill-loader.ts'],
      }),
      terser(),
    ],
  },
];
