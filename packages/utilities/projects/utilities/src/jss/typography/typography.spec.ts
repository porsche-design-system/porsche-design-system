import * as fromTypography from './';

it('should provide all typography exports', () => {
  expect(Object.keys(fromTypography).length).toBe(11);
});

it.each<keyof typeof fromTypography>(Object.keys(fromTypography) as (keyof typeof fromTypography)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromTypography[item]).toMatchSnapshot();
  }
);
