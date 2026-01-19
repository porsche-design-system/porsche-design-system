import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';

// Used in order to compile some styles with vanilla-extract and use the compiled css in unit tests
export default {
  // TODO: Can we use a glob pattern to compile all css.ts files?
  input: [
    'tests/unit/specs/vanilla-extract-getFocusStyle.css.ts',
    'tests/unit/specs/vanilla-extract-getHoverStyle.css.ts',
    'tests/unit/specs/vanilla-extract-getMediaQueryMax.css.ts',
    'tests/unit/specs/vanilla-extract-getMediaQueryMin.css.ts',
    'tests/unit/specs/vanilla-extract-getMediaQueryMinMax.css.ts',
    'tests/unit/specs/vanilla-extract-getSkeletonStyle.css.ts',
  ],
  plugins: [
    vanillaExtractPlugin({
      // Use .test as class identifier
      identifiers: ({ hash }) => 'test',
    }),
  ],
  output: {
    dir: 'tests/unit/specs/generated',
    assetFileNames({ name }) {
      return name.replace(/tests\/unit\/specs\//, '');
    },
  },
};
