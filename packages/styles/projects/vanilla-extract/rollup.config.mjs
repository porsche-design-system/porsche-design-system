import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { readdirSync } from 'fs';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const outputDir = 'dist';

const categories = readdirSync('src', { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const commonPlugins = [
  resolve({
    resolveOnly: [/^@porsche-design-system\/tokens$/],
  }),
];

const ts = (format, { exclude = '**.spec.ts' } = {}) =>
  format === 'esm'
    ? typescript({ declaration: true, declarationDir: `${outputDir}/esm`, exclude, rootDir: 'src' })
    : typescript();

const entryFileNames = (ext) => (chunk) => (chunk.name === 'index.styles' ? `index.${ext}` : `[name].${ext}`);

const stylesBuild = (format, ext) => ({
  input: ['src/index.styles.ts', ...categories.map((category) => `src/${category}/index.ts`)],
  output: {
    dir: `${outputDir}/${format}`,
    format,
    entryFileNames: entryFileNames(ext),
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    ...commonPlugins,
    ts(format),
    ...(format === 'esm'
      ? [
          generatePackageJson({
            outputFolder: outputDir,
            baseContents: {
              main: 'cjs/index.cjs',
              module: 'esm/index.mjs',
              types: 'esm/index.d.ts',
              sideEffects: false,
              exports: {
                '.': {
                  types: './esm/index.d.ts',
                  import: './esm/index.mjs',
                  default: './cjs/index.cjs',
                },
              },
            },
          }),
        ]
      : []),
  ],
});

export default [stylesBuild('cjs', 'cjs'), stylesBuild('esm', 'mjs')];
