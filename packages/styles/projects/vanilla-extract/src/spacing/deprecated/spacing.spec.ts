import { expect, it } from 'vitest';
import * as fromSpacing from '../';

it('should provide all exports', () => {
  expect(Object.keys(fromSpacing).length).toBe(15);
});

it.each<keyof typeof fromSpacing>(Object.keys(fromSpacing) as (keyof typeof fromSpacing)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromSpacing[item]).toMatchSnapshot();
  }
);
