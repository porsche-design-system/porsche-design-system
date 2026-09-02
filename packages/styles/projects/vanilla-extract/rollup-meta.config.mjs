import typescript from '@rollup/plugin-typescript';

const outputDir = 'meta';
const external = [/^@porsche-design-system\/(tokens|shared)/];

export default [
  {
    input: 'vanillaExtractMeta/index.ts',
    external,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      preserveModulesRoot: 'vanillaExtractMeta',
    },
    plugins: [typescript({ exclude: ['**/*.spec.ts'] })],
  },
  {
    input: 'vanillaExtractMeta/index.ts',
    external,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'vanillaExtractMeta',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: `${outputDir}/esm`,
        rootDir: '.',
        exclude: ['**/*.spec.ts'],
      }),
    ],
  },
];
