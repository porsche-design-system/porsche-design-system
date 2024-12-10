import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';

export default {
  input: 'tests/unit/specs/vanilla-extract-test.css.ts',
  plugins: [
    vanillaExtractPlugin({
      identifiers: ({ hash }) => 'test',
    }),
  ],
  output: {
    dir: 'tests/unit/specs/generated', // Specify the output directory
    assetFileNames({ name }) {
      return 'vanilla-extract.css';
    },
  },
};
