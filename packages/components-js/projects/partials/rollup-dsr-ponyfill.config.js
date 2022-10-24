import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/dsr-ponyfill.ts',
    output: {
      file: 'dist/dsr-ponyfill.min.js',
      format: 'iife',
    },
    plugins: [
      // remove check for ponyfill since our loader takes care of it
      replace({
        'if (hasNativeDeclarativeShadowRoots())': 'if (false)',
        delimiters: ['', ''],
        preventAssignment: true,
      }),
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        include: ['src/dsr-ponyfill.ts'],
      }),
      terser({
        output: {
          comments: false,
        },
      }),
    ],
  },
];
