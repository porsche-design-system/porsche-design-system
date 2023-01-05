import * as fromFont from './';

it('should provide all exports', () => {
  expect(Object.keys(fromFont).length).toBe(7);
});

it.each<keyof typeof fromFont>(Object.keys(fromFont) as (keyof typeof fromFont)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromFont[item]).toMatchSnapshot();
  }
);
