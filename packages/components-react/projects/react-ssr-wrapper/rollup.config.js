import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const outputDir = '../../dist/react-wrapper/ssr';
const input = 'src/public-api.ts';

const typescriptOpts = {
  tsconfig: 'tsconfig.json',
};

const external = ['@porsche-design-system/components-js', 'react', 'react/jsx-runtime'];

// to silence warnings like
// Module level directives cause errors when bundled, "use client" in "..." was ignored.
// https://github.com/Ephem/rollup-plugin-preserve-directives#disabling-warnings
const onwarn = (warning, warn) => {
  if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
    warn(warning);
  }
};

export default [
  {
    input,
    external,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
    },
    plugins: [preserveDirectives.default(), resolve(), typescript(typescriptOpts)],
    onwarn,
  },
  {
    input,
    external,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
    },
    plugins: [
      preserveDirectives.default(),
      resolve(),
      typescript({ ...typescriptOpts, declaration: true, declarationDir: `${outputDir}/esm`, rootDir: 'src' }),
      generatePackageJson({
        outputFolder: outputDir,
        baseContents: {
          main: 'cjs/components-react/projects/react-ssr-wrapper/src/public-api.cjs',
          module: 'esm/components-react/projects/react-ssr-wrapper/src/public-api.mjs',
          types: 'esm/public-api.d.ts',
          sideEffects: false,
        },
      }),
    ],
    onwarn,
  },
];
