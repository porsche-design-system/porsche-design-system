import { isDeepEqual } from './is-deep-equal';

describe('isDeepEqual()', () => {
  const data: { val1: unknown; val2: unknown; result: boolean }[] = [
    {
      val1: { foo: 'bar', bar: 'foo' },
      val2: { foo: 'bar', bar: 'foo' },
      result: true,
    },
    {
      val1: { foo: 'bar', bar: 'foo' },
      val2: { bar: 'foo', foo: 'bar' },
      result: true,
    },
    {
      val1: { foo: { foo: 'bar', bar: 'foo' }, bar: 'foo' },
      val2: { foo: { foo: 'bar', bar: 'foo' }, bar: 'foo' },
      result: true,
    },
    {
      val1: { foo: { foo: 'bar', bar: 'foo' }, bar: 'foo' },
      val2: { foo: { bar: 'foo', foo: 'bar' }, bar: 'foo' },
      result: true,
    },
    {
      val1: { bar: 'foo', foo: 'bar' },
      val2: { foo: { bar: 'fooo', foo: 'bar' }, bar: 'foo' },
      result: false,
    },
    {
      val1: { foo: { foo: 'bar', bar: 'foo' }, bar: 'foo' },
      val2: { foo: { bar: 'fooo', foo: 'bar' }, bar: 'foo' },
      result: false,
    },
    {
      val1: 'foo',
      val2: 'bar',
      result: false,
    },
    {
      val1: 'foo',
      val2: 'foo',
      result: true,
    },
    {
      val1: 1,
      val2: 0,
      result: false,
    },
    {
      val1: 1,
      val2: 1,
      result: true,
    },
    {
      val1: true,
      val2: false,
      result: false,
    },
    {
      val1: true,
      val2: true,
      result: true,
    },
  ];
  it.each(data.map(({ val1, val2, result }) => [val1, val2, result] as [unknown, unknown, boolean]))(
    'should for val1: %s and val2: %s return %s',
    (val1, val2, result) => {
      expect(isDeepEqual(val1, val2)).toEqual(result);
    }
  );
});
