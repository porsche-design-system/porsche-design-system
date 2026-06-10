import { expect, it } from 'vitest';
import { vanillaExtractMeta } from '../../../src';

const serializeMeta = (value: unknown): unknown => {
  if (typeof value === 'function') return value.toString();
  if (Array.isArray(value)) return value.map(serializeMeta);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, serializeMeta(val)]));
  }
  return value;
};

it('should match snapshot', () => {
  expect(serializeMeta(vanillaExtractMeta)).toMatchSnapshot();
});
