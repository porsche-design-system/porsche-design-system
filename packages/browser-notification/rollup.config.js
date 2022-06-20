import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import pkg from './package.json';

const rootDir = '.';
const outputDir = './dist';

export default [
  {
    input: 'src/index.ts',
    output: {
      esModule: false,
      dir: 'dist',
      format: 'umd',
      name: pkg.name,
      exports: 'named',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist/types',
      }),
      json(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'esm',
    },
    plugins: [
      typescript(),
      json(),
      copy({
        targets: [
          { src: `${rootDir}/LICENSE`, dest: outputDir },
          { src: `${rootDir}/OSS_NOTICE`, dest: outputDir },
          { src: `${rootDir}/README.md`, dest: outputDir },
          { src: `${rootDir}/CHANGELOG.md`, dest: outputDir },
        ],
      }),
      generatePackageJson({
        inputFolder: rootDir,
        outputFolder: outputDir,
        baseContents: (pkg) => ({
          name: pkg.name,
          version: pkg.version,
          description: pkg.description,
          keywords: pkg.keywords,
          scope: pkg.scope,
          author: pkg.author,
          license: pkg.license,
          homepage: pkg.homepage,
          main: 'index.js',
          module: 'esm/index.js',
          types: 'types/index.d.ts',
        }),
      }),
    ],
  },
];
