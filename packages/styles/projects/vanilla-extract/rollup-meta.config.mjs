import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const outputDir = 'meta';

const isStyleModule = (id) => id.includes('/src/') && !id.includes('/vanillaExtractMeta/');

const metaStylePath = (id, ext, format) => {
  const match = id.replace(/\/index\.tsx?$/, '').match(/\/src\/([^/]+)$/);
  return match ? `../../dist/${format}/${match[1]}/index.${ext}` : id;
};

export default [
  {
    input: 'vanillaExtractMeta/index.ts',
    external: isStyleModule,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      preserveModulesRoot: 'vanillaExtractMeta',
      paths: (id) => metaStylePath(id, 'cjs', 'cjs'),
    },
    plugins: [typescript({ exclude: ['**/*.spec.ts'] })],
  },
  {
    input: 'vanillaExtractMeta/index.ts',
    external: isStyleModule,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'vanillaExtractMeta',
      paths: (id) => metaStylePath(id, 'mjs', 'esm'),
    },
    plugins: [
      typescript({ declaration: true, declarationDir: `${outputDir}/esm`, rootDir: '.', exclude: ['**/*.spec.ts'] }),
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
    ],
  },
];
