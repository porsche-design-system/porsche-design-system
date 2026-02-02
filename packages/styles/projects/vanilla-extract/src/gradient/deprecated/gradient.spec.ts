import { expect, it } from 'vitest';
import * as fromGradient from './';

it('should provide all exports', () => {
  expect(Object.keys(fromGradient).length).toBe(4);
});

it.each<keyof typeof fromGradient>(Object.keys(fromGradient) as (keyof typeof fromGradient)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromGradient[item]).toMatchSnapshot();
  }
);
