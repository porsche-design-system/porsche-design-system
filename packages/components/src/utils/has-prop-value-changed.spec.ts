import { hasPropValueChanged } from './has-prop-value-changed';

describe('hasPropValueChanged()', () => {
  const data: { val1: unknown; val2: unknown; result: boolean }[] = [
    {
      val1: { foo: 'bar', bar: 'foo' },
      val2: { foo: 'bar', bar: 'foo' },
      result: false,
    },
    {
      val1: { foo: 'bar', bar: 'foo' },
      val2: { bar: 'foo', foo: 'bar' },
      result: false,
    },
    {
      val1: { foo: 'bar', bar: 'foo' },
      val2: { foo: 'foo', bar: 'bar' },
      result: true,
    },
    {
      val1: { foo: 'bar', bar: 'foo' },
      val2: { foo: 'bar', bar: 'foo', fooo: 'foo' },
      result: true,
    },
    {
      val1: [1, 2],
      val2: [1, 2],
      result: false,
    },
    {
      val1: [1, 2],
      val2: [2, 1],
      result: true,
    },
    {
      val1: [1, 2],
      val2: [1, 1],
      result: true,
    },
    {
      val1: [1, 2, 2],
      val2: [1, 1, 3],
      result: true,
    },
    {
      val1: 'foo',
      val2: 'bar',
      result: true,
    },
    {
      val1: 'foo',
      val2: 'foo',
      result: false,
    },
    {
      val1: 1,
      val2: 0,
      result: true,
    },
    {
      val1: 1,
      val2: 1,
      result: false,
    },
    {
      val1: true,
      val2: false,
      result: true,
    },
    {
      val1: true,
      val2: true,
      result: false,
    },
  ];
  it.each(data.map(({ val1, val2, result }) => [val1, val2, result] as [unknown, unknown, boolean]))(
    'should for val1: %s and val2: %s return %s',
    (val1, val2, result) => {
      expect(hasPropValueChanged(val1, val2)).toEqual(result);
    }
  );
});
