import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import shebang from 'rollup-plugin-preserve-shebang';

const rootDir = '../..';
const outputDir = 'dist';
const input = 'src/index.ts';

const commonPlugins = [
  resolve({
    resolveOnly: [/^@porsche-design-system\/.*$/],
  }),
];

export default [
  {
    input,
    output: {
      dir: outputDir,
      format: 'cjs',
    },
    plugins: [
      ...commonPlugins,
      typescript({ declaration: true, declarationDir: `${outputDir}/types`, rootDir: 'src' }),
    ],
  },
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
    },
    plugins: [
      ...commonPlugins,
      typescript(),
      copy({
        targets: [
          { src: `${rootDir}/LICENSE.md`, dest: outputDir },
          { src: `${rootDir}/OSS_NOTICE`, dest: outputDir },
          { src: 'README.md', dest: outputDir },
          { src: 'CHANGELOG.md', dest: outputDir },
        ],
      }),
    ],
  },
  {
    input: 'src/serve-cdn.ts',
    output: {
      dir: 'bin',
      format: 'cjs',
    },
    plugins: [shebang(), resolve(), json(), commonjs(), typescript({ strict: false, rootDir: 'src' })],
  },
];
