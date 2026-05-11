import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const input = 'src/index.ts';
const utilsInput = 'src/utils/index.ts';
const outputDir = 'dist';

export default [
  // Default JS Build - CJS
  {
    input,
    output: [{ dir: outputDir, format: 'cjs', entryFileNames: '[name].cjs' }],
    plugins: [commonjs(), typescript({ declaration: true, declarationDir: outputDir, rootDir: 'src' })],
  },
  // Default JS Build - ESM
  {
    input,
    output: { dir: `${outputDir}/esm`, format: 'esm', entryFileNames: '[name].mjs' },
    plugins: [typescript()],
  },
  // Utils Build - CJS
  {
    input: utilsInput,
    output: [{ dir: outputDir, format: 'cjs', entryFileNames: 'utils/[name].cjs' }],
    plugins: [commonjs(), typescript({ declaration: true, declarationDir: outputDir, rootDir: 'src' })],
  },
  // Utils Build - ESM
  {
    input: utilsInput,
    output: { dir: `${outputDir}/esm`, format: 'esm', entryFileNames: 'utils/[name].mjs' },
    plugins: [typescript()],
  },
];
