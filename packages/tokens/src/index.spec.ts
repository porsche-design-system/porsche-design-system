import { it, expect } from 'vitest';
import * as fromIndex from './';

it.each<keyof typeof fromIndex>(Object.keys(fromIndex) as (keyof typeof fromIndex)[])(
  'should contain correct value for %s',
  (item) => {
    expect(fromIndex[item]).toMatchSnapshot();
  }
);
