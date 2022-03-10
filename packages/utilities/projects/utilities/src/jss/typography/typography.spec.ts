import * as fromTypography from './typography';

it.each<keyof typeof fromTypography>([
  'headline',
  'headline1',
  'headline2',
  'headline3',
  'headline4',
  'headline5',
  'text',
  'textLarge',
  'textMedium',
  'textSmall',
  'textXLarge',
  'textXSmall',
  'titleLarge',
])('should contain correct values for %s', (item) => {
  expect(fromTypography[item]).toMatchSnapshot();
});
