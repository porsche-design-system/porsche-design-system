import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';

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
    output: { dir: `${outputDir}/esm`, format: 'esm' },
    plugins: [
      ...commonPlugins,
      typescript(),
      copy({
        targets: [
          { src: `${rootDir}/LICENSE`, dest: outputDir },
          { src: `${rootDir}/OSS_NOTICE`, dest: `${outputDir}/NOTICE` },
          { src: 'README.md', dest: outputDir },
          { src: 'CHANGELOG.md', dest: outputDir },
        ],
      }),
    ],
  },
];
