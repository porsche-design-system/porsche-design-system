import * as fromSpacing from './';

it('should provide all exports', () => {
  expect(Object.keys(fromSpacing).length).toBe(14);
});

it.each<keyof typeof fromSpacing>(Object.keys(fromSpacing) as (keyof typeof fromSpacing)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromSpacing[item]).toMatchSnapshot();
  }
);
