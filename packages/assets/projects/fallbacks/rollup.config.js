import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const outputConfig = {
  esModule: false,
  format: 'iife',
  exports: 'named',
  strict: false,
};

const inputDir = './src';
const outputDir = './dist/tmp';

export default [
  {
    input: `${inputDir}/browser-support/browser-support-loader.ts`,
    output: {
      ...outputConfig,
      file: `${outputDir}/browser-support-loader.js`,
    },
    plugins: [typescript(), terser()],
  },
  {
    input: `${inputDir}/browser-support/browser-support.ts`,
    output: {
      ...outputConfig,
      format: 'esm',
      file: `${outputDir}/browser-support.js`,
    },
    plugins: [typescript(), terser()],
  },
  {
    input: `${inputDir}/cookies/cookies-loader.ts`,
    output: {
      ...outputConfig,
      file: `${outputDir}/cookies-loader.js`,
    },
    plugins: [typescript(), terser()],
  },
  {
    input: `${inputDir}/cookies/cookies.ts`,
    output: {
      ...outputConfig,
      format: 'esm',
      file: `${outputDir}/cookies.js`,
    },
    plugins: [typescript(), terser()],
  },
];
