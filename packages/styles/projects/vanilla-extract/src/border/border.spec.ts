import { expect, it } from 'vitest';
import * as fromBorder from './index';

it('should provide all exports', () => {
  expect(Object.keys(fromBorder).length).toBe(8);
});

it.each<keyof typeof fromBorder>(Object.keys(fromBorder) as (keyof typeof fromBorder)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromBorder[item]).toMatchSnapshot();
  }
);
