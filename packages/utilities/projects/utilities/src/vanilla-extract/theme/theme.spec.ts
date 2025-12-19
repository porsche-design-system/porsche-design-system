import * as fromTheme from './';

it('should provide all exports', () => {
  expect(Object.keys(fromTheme).length).toBe(43);
});

it.each<keyof typeof fromTheme>(Object.keys(fromTheme) as (keyof typeof fromTheme)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromTheme[item]).toMatchSnapshot();
  }
);
