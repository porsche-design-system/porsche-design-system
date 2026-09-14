// @ts-check
import typescript from '@rollup/plugin-typescript';

const input = 'src/index.ts';
const outputDir = 'meta';

export default [
  {
    input,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [typescript({ noEmitOnError: true, exclude: ['**/*.spec.ts'] })],
  },
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      typescript({
        noEmitOnError: true,
        declaration: true,
        declarationDir: `${outputDir}/esm`,
        rootDir: 'src',
        exclude: ['**/*.spec.ts'],
      }),
    ],
  },
];
