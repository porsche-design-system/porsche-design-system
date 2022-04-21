import * as fromTheme from './';

it('should provide all theme exports', () => {
  expect(Object.keys(fromTheme).length).toBe(4);
});

it.each<keyof typeof fromTheme>(Object.keys(fromTheme) as (keyof typeof fromTheme)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromTheme[item]).toMatchSnapshot();
  }
);
