import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import shebang from 'rollup-plugin-preserve-shebang';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  // Suppress circular dependency warnings from third-party node_modules.
  // These are well-known internal cycles in bundled deps (zod, zod-to-json-schema)
  // and are not actionable from this package.
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.ids?.some((id) => id.includes('node_modules'))) return;
    warn(warning);
  },
  plugins: [
    shebang(),
    resolve({ preferBuiltins: true }),
    json(),
    commonjs(),
    typescript({
      strict: false,
      rootDir: 'src',
      allowImportingTsExtensions: false,
      noEmit: false,
      declaration: false,
    }),
    generatePackageJson({
      baseContents: (pkg) => ({
        name: pkg.name,
        description: 'Porsche Design System MCP Server – Model Context Protocol server for PDS documentation.',
        author: pkg.author,
        license: pkg.license,
        homepage: pkg.homepage,
        keywords: pkg.keywords,
        bin: {
          'pds-mcp-server': './index.js',
        },
        engines: {
          node: '>=22',
        },
        // No dependencies — everything is bundled
      }),
    }),
  ],
};
