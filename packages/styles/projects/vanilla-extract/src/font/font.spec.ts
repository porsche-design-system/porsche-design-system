import * as fromFont from './index';

it('should provide all exports', () => {
  expect(Object.keys(fromFont).length).toBe(29);
});

it.each<keyof typeof fromFont>(Object.keys(fromFont) as (keyof typeof fromFont)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromFont[item]).toMatchSnapshot();
  }
);
