import * as fromColor from './color';

it('should provide all color exports', () => {
  expect(Object.keys(fromColor).length).toBe(6);
});

it.each<keyof typeof fromColor>(Object.keys(fromColor) as (keyof typeof fromColor)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromColor[item]).toMatchSnapshot();
  }
);
