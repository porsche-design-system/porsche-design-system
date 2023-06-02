import { isDeepEqual } from './is-deep-equal';

describe('deepEqual()', () => {
  const data: { obj1: Record<string, any>; obj2: Record<string, any>; result: boolean }[] = [
    {
      obj1: { foo: 'bar', bar: 'foo' },
      obj2: { foo: 'bar', bar: 'foo' },
      result: true,
    },
    {
      obj1: { foo: 'bar', bar: 'foo' },
      obj2: { bar: 'foo', foo: 'bar' },
      result: true,
    },
    {
      obj1: { foo: { foo: 'bar', bar: 'foo' }, bar: 'foo' },
      obj2: { foo: { foo: 'bar', bar: 'foo' }, bar: 'foo' },
      result: true,
    },
    {
      obj1: { foo: { foo: 'bar', bar: 'foo' }, bar: 'foo' },
      obj2: { foo: { bar: 'foo', foo: 'bar' }, bar: 'foo' },
      result: true,
    },
    {
      obj1: { bar: 'foo', foo: 'bar' },
      obj2: { foo: { bar: 'fooo', foo: 'bar' }, bar: 'foo' },
      result: false,
    },
    {
      obj1: { foo: { foo: 'bar', bar: 'foo' }, bar: 'foo' },
      obj2: { foo: { bar: 'fooo', foo: 'bar' }, bar: 'foo' },
      result: false,
    },
  ];
  it.each(data.map(({ obj1, obj2, result }) => [obj1, obj2, result]))(
    `should be called with '%s' and %s and return '%s'`,
    (obj1: Record<string, any>, obj2: Record<string, any>, result: boolean) => {
      expect(isDeepEqual(obj1, obj2)).toEqual(result);
    }
  );
});
