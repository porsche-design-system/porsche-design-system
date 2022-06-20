import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const outputConfig = {
  esModule: false,
  format: 'iife',
  exports: 'named',
  strict: false,
};

export default [
  {
    input: 'src/banners/init-banner.ts',
    output: {
      ...outputConfig,
      file: `./tmp/init-banner.min.${pkg.version}.js`,
    },
    plugins: [typescript(), json(), terser()],
  },
  {
    input: 'src/overlays/init-overlay.ts',
    output: {
      ...outputConfig,
      file: `./tmp/init-overlay.min.${pkg.version}.js`,
    },
    plugins: [typescript(), json(), terser()],
  },
  {
    input: 'src/overlays/init-cookie-overlay.ts',
    output: {
      ...outputConfig,
      file: `./tmp/init-cookie-overlay.min.${pkg.version}.js`,
    },
    plugins: [typescript(), json(), terser()],
  },
  {
    input: 'src/banners/banner.ts',
    output: {
      ...outputConfig,
      file: `./cdn/banner.min.${pkg.version}.js`,
    },
    plugins: [typescript(), terser()],
  },
  {
    input: 'src/overlays/overlay.ts',
    output: {
      ...outputConfig,
      file: `./cdn/overlay.min.${pkg.version}.js`,
    },
    plugins: [typescript(), terser()],
  },
  {
    input: 'src/overlays/cookie-overlay.ts',
    output: {
      ...outputConfig,
      file: `./cdn/cookie-overlay.min.${pkg.version}.js`,
    },
    plugins: [typescript(), terser()],
  },
];
