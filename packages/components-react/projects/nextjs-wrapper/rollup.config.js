import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import resolve from '@rollup/plugin-node-resolve';

const outputDir = '../../dist/react-wrapper/ssr';
const input = 'src/public-api.ts';

const typescriptOpts = {
  tsconfig: 'tsconfig.json',
};

const external = ['@porsche-design-system/components-js', 'react', 'react/jsx-runtime'];

export default [
  {
    input,
    external,
    output: {
      dir: outputDir,
      format: 'cjs',
    },
    plugins: [
      resolve(),
      typescript({
        ...typescriptOpts,
        declaration: true,
        declarationDir: outputDir,
        rootDir: 'src',
      }),
      generatePackageJson({
        baseContents: {
          main: 'index.js',
          module: 'esm/index.js',
          sideEffects: false,
        },
      }),
    ],
  },
  {
    input,
    external,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
    },
    plugins: [resolve(), typescript(typescriptOpts)],
  },
];
