import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const input = 'src/jss/index.ts';
const outputDir = 'dist/jss';

export default [
  {
    input,
    output: {
      dir: outputDir,
      format: 'cjs',
      preserveModules: true,
      plugins: [
        generatePackageJson({
          baseContents: {
            main: 'index.js',
            module: 'esm/index.js',
            types: 'index.d.ts',
            sideEffects: false,
          },
        }),
      ],
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: outputDir,
        exclude: '**.spec.ts',
        rootDir: 'src/jss',
      }),
    ],
  },
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      preserveModules: true,
    },
    plugins: [typescript()],
  },
];
