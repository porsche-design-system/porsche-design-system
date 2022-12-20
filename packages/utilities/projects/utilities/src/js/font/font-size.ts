const typeScaleStatic = ['.875rem', '1rem', '1.25rem', '1.5rem', '2.25rem', '3rem', '4rem'];

// TODO: add explanation how, min, max and in-between values are generated
const typeScaleFluid = [
  '.875rem',
  '1rem',
  'clamp(1.2rem, .12vw + 1.18rem, 1.31rem)',
  'clamp(1.44rem, .3vw + 1.38rem, 1.71rem)',
  'clamp(1.73rem, .57vw + 1.61rem, 2.24rem)',
  'clamp(2.07rem, .96vw + 1.88rem, 2.94rem)',
  'clamp(2.49rem, 1.51vw + 2.19rem, 3.84rem)',
  'clamp(2.07rem, 3.32vw + 1.41rem, 5.06rem)',
  'clamp(2.49rem, 5.67vw + 1.35rem, 7.59rem)',
];

type FontSizeKey =
  | 'textXSmall'
  | 'textSmall'
  | 'textMedium'
  | 'textLarge'
  | 'textXLarge'
  | 'headingSmall'
  | 'headingMedium'
  | 'headingLarge'
  | 'headingXLarge'
  | 'headingXxLarge'
  | 'headingXxxLarge'
  | 'displayMedium'
  | 'displayLarge';

export const fontSize: { [key in 'static' | 'fluid']: { [key in FontSizeKey]: string } } = {
  static: {
    textXSmall: typeScaleStatic[0],
    textSmall: typeScaleStatic[1],
    textMedium: typeScaleStatic[2],
    textLarge: typeScaleStatic[3],
    textXLarge: typeScaleStatic[4],
    headingSmall: typeScaleStatic[1],
    headingMedium: typeScaleStatic[2],
    headingLarge: typeScaleStatic[3],
    headingXLarge: typeScaleStatic[4],
    headingXxLarge: typeScaleStatic[5],
    headingXxxLarge: typeScaleStatic[6],
    displayMedium: typeScaleStatic[0],
    displayLarge: typeScaleStatic[0],
  },
  fluid: {
    textXSmall: typeScaleFluid[0],
    textSmall: typeScaleFluid[1],
    textMedium: typeScaleFluid[2],
    textLarge: typeScaleFluid[3],
    textXLarge: typeScaleFluid[4],
    headingSmall: typeScaleFluid[1],
    headingMedium: typeScaleFluid[2],
    headingLarge: typeScaleFluid[3],
    headingXLarge: typeScaleFluid[4],
    headingXxLarge: typeScaleFluid[5],
    headingXxxLarge: typeScaleFluid[6],
    displayMedium: typeScaleFluid[7],
    displayLarge: typeScaleFluid[8],
  },
};
