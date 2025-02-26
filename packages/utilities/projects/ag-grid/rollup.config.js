import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const input = 'src/index.ts';
const outputDir = 'dist';

const isDevBuild = process.env.PDS_IS_STAGING === '1';

const external = ['ag-grid-community'];

const sharedPlugins = [
  replace({
    preventAssignment: true,
    // SSR is currently not supported in ag-grid
    ROLLUP_REPLACE_CDN_BASE_URL: isDevBuild
      ? '"http://localhost:3001"'
      : 'document.porscheDesignSystem.cdn.url + "/porsche-design-system"', // document variable is set via components-js load() call
  }),
  resolve({
    resolveOnly: [/^@porsche-design-system\/icons.*$/],
  }),
];

export default [
  // Default JS Build - CJS
  {
    input,
    external,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [...sharedPlugins, typescript()],
  },
  // Default JS Build - ESM
  {
    input,
    external,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      ...sharedPlugins,
      typescript({
        declaration: true,
        declarationDir: `${outputDir}/esm`,
        exclude: '**.spec.ts',
        rootDir: 'src',
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
