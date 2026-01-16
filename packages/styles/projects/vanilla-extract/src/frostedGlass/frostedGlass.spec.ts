import * as fromFrostedGlass from './index';

it('should provide all exports', () => {
  expect(Object.keys(fromFrostedGlass).length).toBe(1);
});

it.each<keyof typeof fromFrostedGlass>(Object.keys(fromFrostedGlass) as (keyof typeof fromFrostedGlass)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromFrostedGlass[item]).toMatchSnapshot();
  }
);
