import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const input = 'src/jss/index.ts';

export default [
  {
    input,
    output: {
      dir: 'dist/jss',
      format: 'cjs',
      plugins: [
        generatePackageJson({
          baseContents: {
            name: '@porsche-design-system/utilities-jss',
            version: '0.0.0',
            main: 'index.js',
            module: 'esm/index.js',
            types: 'types/index.d.ts',
            sideEffects: false,
          },
        }),
      ],
    },
    plugins: [
      typescript({ declaration: true, declarationDir: 'dist/jss/types', exclude: '**.spec.ts', rootDir: 'src/jss' }),
    ],
  },
  {
    input,
    output: {
      dir: 'dist/jss/esm',
      format: 'esm',
    },
    plugins: [typescript()],
  },
];
