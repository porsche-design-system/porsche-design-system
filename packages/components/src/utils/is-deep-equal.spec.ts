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
    {
      obj1: 'foo',
      obj2: 'bar',
      result: false,
    },
    {
      obj1: 'foo',
      obj2: 'foo',
      result: true,
    },
    {
      obj1: '1',
      obj2: '0',
      result: false,
    },
    {
      obj1: '1',
      obj2: '1',
      result: true,
    },
    {
      obj1: true,
      obj2: false,
      result: false,
    },
    {
      obj1: true,
      obj2: true,
      result: true,
    },
  ];
  it.each(data.map(({ obj1, obj2, result }) => [obj1, obj2, result]))(
    'should for obj1: %s and obj2: %s return %s',
    (obj1: Record<string, any>, obj2: Record<string, any>, result: boolean) => {
      expect(isDeepEqual(obj1, obj2)).toEqual(result);
    }
  );
});
