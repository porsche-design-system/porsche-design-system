import * as fromFont from '../../../../../src/font/generated/deprecated';

it('should provide all exports', () => {
  expect(Object.keys(fromFont).length).toBe(24);
});

it.each<keyof typeof fromFont>(
  Object.keys(fromFont) as (keyof typeof fromFont)[]
)('should contain correct values for %s', (item) => {
  expect(fromFont[item]).toMatchSnapshot();
});
