import * as fromGradient from './index';

it('should provide all exports', () => {
  expect(Object.keys(fromGradient).length).toBe(4);
});

it.each<keyof typeof fromGradient>(Object.keys(fromGradient) as (keyof typeof fromGradient)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromGradient[item]).toMatchSnapshot();
  }
);
