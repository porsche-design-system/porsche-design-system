import * as fromTypography from './typography';

it.each<keyof typeof fromTypography>(Object.keys(fromTypography) as (keyof typeof fromTypography)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromTypography[item]).toMatchSnapshot();
  }
);
