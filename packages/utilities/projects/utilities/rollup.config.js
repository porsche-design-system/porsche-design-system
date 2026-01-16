import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const input = 'src/js/index.ts';
const outputDir = 'dist';

const commonPlugins = [
  resolve({
    // Resolve tokens package to inline the values
    resolveOnly: [/^@porsche-design-system\/tokens$/],
  }),
];

export default [
  // Default JS Build - CJS
  {
    input,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      preserveModulesRoot: 'src/js',
    },
    plugins: [...commonPlugins, typescript()],
  },
  // Default JS Build - ESM
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'src/js',
    },
    plugins: [
      ...commonPlugins,
      typescript({
        declaration: true,
        declarationDir: `${outputDir}/esm`,
        exclude: '**.spec.ts',
        rootDir: 'src/js',
      }),
      copy({
        targets: [{ src: ['src/scss/**/*.scss', 'src/_index.scss'], dest: outputDir }],
        flatten: false,
      }),
      generatePackageJson({
        outputFolder: outputDir,
        baseContents: {
          main: 'cjs/index.cjs',
          module: 'esm/index.mjs',
          types: 'esm/index.d.ts',
          sideEffects: false,
          exports: {
            // Default export (JS)
            '.': {
              types: './esm/index.d.ts',
              import: './esm/index.mjs',
              default: './cjs/index.cjs',
            },
          },
        },
      }),
    ],
  },
];
