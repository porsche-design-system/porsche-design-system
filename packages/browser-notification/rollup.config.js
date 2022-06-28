import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const outputConfig = {
  esModule: false,
  format: 'iife',
  exports: 'named',
  strict: false,
};

const inputDir = './src';
const outputDir = './tmp';

export default [
  {
    input: `${inputDir}/browser-support/browser-support-loader.ts`,
    output: {
      ...outputConfig,
      file: `${outputDir}/browser-support-loader.min.js`,
    },
    plugins: [typescript(), terser()],
  },
  {
    input: `${inputDir}/browser-support/browser-support.ts`,
    output: {
      ...outputConfig,
      file: `${outputDir}/browser-support.min.js`,
    },
    plugins: [typescript(), terser()],
  },
  {
    input: `${inputDir}/cookie-support/cookie-support-loader.ts`,
    output: {
      ...outputConfig,
      file: `${outputDir}/cookie-support-loader.min.js`,
    },
    plugins: [typescript(), terser()],
  },
  {
    input: `${inputDir}/cookie-support/cookie-support.ts`,
    output: {
      ...outputConfig,
      file: `${outputDir}/cookie-support.min.js`,
    },
    plugins: [typescript(), terser()],
  },
];
