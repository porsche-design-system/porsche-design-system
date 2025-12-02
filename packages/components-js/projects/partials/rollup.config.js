import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const outputDir = 'dist';
const input = 'src/index.ts';

// Custom plugin to modify the final output as 'rollup-plugin-modify' will try to replace too early.
// Even though react/jsx-runtime is necessary to use the partials in React, we don't bundle it
// to avoid version incompatibilities between React 18 and 19. Instead, we replace the require
// of react/jsx-runtime with a try/catch to avoid errors in projects that don't have it as a dependency
// and therefore won't use the jsx format option.

const modifyFinalOutputCjs = () => ({
  name: 'modify-final-output',
  generateBundle: (_, bundle) => {
    // Match the top level require of react/jsx-runtime and save assigned var name as regex group
    const replacementRegex = /var (\S+) = require\('react\/jsx-runtime'\);/;
    for (const [fileName, file] of Object.entries(bundle)) {
      if (file.type === 'chunk' && file.code) {
        if (!file.code.match(replacementRegex)) {
          throw new Error(`Partial build failed! Could not replace react/jsx-runtime require with try/catch block`);
        }
        // Wrap require of react/jsx-runtime in try/catch to avoid errors when not included as dependency
        file.code = file.code.replace(
          replacementRegex,
          (_, $1) => `let ${$1};
try {
    ${$1} = require('react/jsx-runtime');
} catch (error) {}`
        );
      }
    }
  },
});

const modifyFinalOutputEsm = () => ({
  name: 'modify-final-output',
  generateBundle: (_, bundle) => {
    // Match the top level require of react/jsx-runtime and save assigned var name as regex group
    const replacementRegex = /import \{ jsx, Fragment, jsxs } from 'react\/jsx-runtime';/;
    for (const [fileName, file] of Object.entries(bundle)) {
      if (file.type === 'chunk' && file.code) {
        if (!file.code.match(replacementRegex)) {
          throw new Error(`Partial build failed! Could not replace react/jsx-runtime require with try/catch block`);
        }
        // Wrap import of react/jsx-runtime in try/catch to avoid errors when not included as dependency. Function is necessary to avoid issues with topLevelAwait
        file.code = file.code.replace(
          replacementRegex,
          (_, $1) => `let jsxs;
let Fragment;
let jsx;
async function maybeImportJSXRuntime() {
  try {
    ({ jsxs, Fragment, jsx } = await import('react/jsx-runtime'));
  } catch (error) {}
}

maybeImportJSXRuntime();`
        );
      }
    }
  },
});

export default [
  // Default JS Build - CJS
  {
    input,
    output: {
      dir: `${outputDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
    plugins: [commonjs(), typescript(), modifyFinalOutputCjs()],
  },
  // Default JS Build - ESM
  {
    input,
    output: {
      dir: `${outputDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: `${outputDir}/esm`,
        exclude: '**.spec.ts',
        rootDir: 'src',
      }),
      generatePackageJson({
        outputFolder: outputDir,
        baseContents: {
          main: 'cjs/index.cjs',
          module: 'esm/index.mjs',
          types: 'esm/index.d.ts',
          sideEffects: false,
          exports: {
            // Default export (JS)
            '.': {
              types: './esm/index.d.ts',
              import: './esm/index.mjs',
              default: './cjs/index.cjs',
            },
          },
        },
      }),
      modifyFinalOutputEsm(),
    ],
  },
];
