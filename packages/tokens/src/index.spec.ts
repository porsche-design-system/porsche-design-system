import { expect, it } from 'vitest';
import * as fromIndex from './';

it.each<keyof typeof fromIndex>(Object.keys(fromIndex) as (keyof typeof fromIndex)[])(
  'should contain correct value for %s',
  (item) => {
    // biome-ignore lint/performance/noDynamicNamespaceImportAccess: ok
    expect(fromIndex[item]).toMatchSnapshot();
  }
);
