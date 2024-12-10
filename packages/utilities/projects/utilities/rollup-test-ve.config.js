import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';

// Used in order to compile some styles with vanilla-extract and use the compiled css in unit tests
export default {
  input: 'tests/unit/specs/vanilla-extract-test.css.ts',
  plugins: [
    vanillaExtractPlugin({
      // Use .test as class identifier
      identifiers: ({ hash }) => 'test',
    }),
  ],
  output: {
    dir: 'tests/unit/specs/generated',
    assetFileNames({ name }) {
      return 'vanilla-extract.css';
    },
  },
};
