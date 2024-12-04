import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const outputDir = 'dist';
const input = 'src/index.ts';

// Even though react/jsx-runtime is necessary to use the partials in react we don't bundle it in order to avoid version incompatibilities with React 18 vs 19
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
      copy({
        // support Webpack 4 by pointing `"module"` to a file with a `.js` extension
        targets: [{ src: `${outputDir}/index.cjs`, dest: outputDir, rename: () => 'index.js' }],
        hook: 'writeBundle',
      }),
    ],
  },
];
