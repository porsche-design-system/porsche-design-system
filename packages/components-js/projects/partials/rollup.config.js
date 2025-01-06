import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const outputDir = 'dist';
const input = 'src/index.ts';

// Custom plugin to modify the final output as 'rollup-plugin-modify' will try to replace too early.
// Even though react/jsx-runtime is necessary to use the partials in React, we don't bundle it
// to avoid version incompatibilities between React 18 and 19. Instead, we replace the require
// of react/jsx-runtime with a try/catch to avoid errors in projects that don't have it as a dependency
// and therefore won't use the jsx format option.

const modifyFinalOutput = () => ({
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

export default [
  {
    input,
    output: {
      file: `${outputDir}/index.cjs`,
      format: 'cjs',
    },
    plugins: [
      commonjs(),
      typescript({ declaration: true, declarationDir: outputDir, rootDir: 'src' }),
      generatePackageJson({
        outputFolder: outputDir,
        baseContents: {
          main: 'index.cjs',
          types: 'index.d.ts',
          sideEffects: false,
        },
      }),
      modifyFinalOutput(),
      copy({
        // support Webpack 4 by pointing `"module"` to a file with a `.js` extension
        targets: [{ src: `${outputDir}/index.cjs`, dest: outputDir, rename: () => 'index.js' }],
        hook: 'writeBundle',
      }),
    ],
  },
];
