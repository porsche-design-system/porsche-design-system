import * as fromMotion from './';

it('should provide all exports', () => {
  expect(Object.keys(fromMotion).length).toBe(7);
});

it.each<keyof typeof fromMotion>(Object.keys(fromMotion) as (keyof typeof fromMotion)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromMotion[item]).toMatchSnapshot();
  }
);
