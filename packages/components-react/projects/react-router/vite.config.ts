import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { Features } from 'lightningcss';
import { defineConfig, type Plugin } from 'vite';

// With Vite's Environment API a single build orchestrates multiple environments (`client` + `ssr`) in one pass, so the
// legacy `isSsrBuild` config flag is no longer a reliable per-output signal — it would resolve `process.browser` to the
// same value for every environment, dropping the declarative shadow DOM from the SSR output. Instead we set
// `process.browser` per environment via the `configEnvironment` hook, keyed off the environment name, so the SSR build
// keeps it falsy (emitting `<template shadowrootmode="open">`) while the client build gets it truthy.
const patchProcessBrowserGlobalIdentifierPlugin = (): Plugin => ({
  name: 'pds:patch-process-browser-global-identifier',
  configEnvironment(name) {
    return {
      define: {
        'process.browser': JSON.stringify(name === 'client'),
      },
    };
  },
});

export default defineConfig({
  css: {
    transformer: 'lightningcss',
    // Disables light-dark() polyfill of lightningcss which is broken https://github.com/porsche-design-system/porsche-design-system/issues/4257
    lightningcss: {
      exclude: Features.LightDark,
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [tailwindcss(), reactRouter(), patchProcessBrowserGlobalIdentifierPlugin()],
});
