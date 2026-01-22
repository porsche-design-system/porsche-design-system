import * as fromDropShadow from './index';

it('should provide all exports', () => {
  expect(Object.keys(fromDropShadow).length).toBe(3);
});

it.each<keyof typeof fromDropShadow>(Object.keys(fromDropShadow) as (keyof typeof fromDropShadow)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromDropShadow[item]).toMatchSnapshot();
  }
);
