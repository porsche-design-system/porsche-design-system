import { mapBreakpointPropToPrefixedClasses } from '../../../src/utils';

describe('mapBreakpointPropToPrefixedClasses', () => {
  it('should create class by passing a "string" prop', () => {
    const result = mapBreakpointPropToPrefixedClasses('some-class-prefix', 'some-string');

    expect(result).toEqual({
      'p-some-class-prefix-some-string': true
    });
  });

  it('should create class by passing a "number" prop', () => {
    const result = mapBreakpointPropToPrefixedClasses('some-class-prefix', 123);

    expect(result).toEqual({
      'p-some-class-prefix-123': true
    });
  });

  it('should create class by passing a "boolean" prop', () => {
    const resultA = mapBreakpointPropToPrefixedClasses('some-class-prefix', true, ['a', 'b']);
    const resultB = mapBreakpointPropToPrefixedClasses('some-class-prefix', false, ['a', 'b']);

    expect(resultA).toEqual({
      'p-some-class-prefix-a': true
    });

    expect(resultB).toEqual({
      'p-some-class-prefix-b': true
    });
  });

  it('should create class by passing a "string" prop containing a boolean', () => {
    const resultA = mapBreakpointPropToPrefixedClasses('some-class-prefix', 'true', ['a', 'b']);
    const resultB = mapBreakpointPropToPrefixedClasses('some-class-prefix', 'false', ['a', 'b']);

    expect(resultA).toEqual({
      'p-some-class-prefix-a': true
    });

    expect(resultB).toEqual({
      'p-some-class-prefix-b': true
    });
  });

  it('should create class by passing an "object" prop', () => {
    const resultA = mapBreakpointPropToPrefixedClasses('some-class-prefix', {
      base: 'some-string',
      xs: true,
      m: false,
      xl: 123
    }, ['a', 'b']);
    const resultB = mapBreakpointPropToPrefixedClasses('some-class-prefix', {base: true}, ['a', 'b']);
    const resultC = mapBreakpointPropToPrefixedClasses('some-class-prefix', {base: false}, ['a', 'b']);
    const resultD = mapBreakpointPropToPrefixedClasses('some-class-prefix', {base: 123});
    const resultE = mapBreakpointPropToPrefixedClasses('some-class-prefix', {base: 1, xs: 2, s: 3, m: 4, l: 5, xl: 6});

    expect(resultA).toEqual({
      'p-some-class-prefix-some-string': true,
      'p-some-class-prefix-a-xs': true,
      'p-some-class-prefix-b-m': true,
      'p-some-class-prefix-123-xl': true
    });

    expect(resultB).toEqual({
      'p-some-class-prefix-a': true
    });

    expect(resultC).toEqual({
      'p-some-class-prefix-b': true
    });

    expect(resultD).toEqual({
      'p-some-class-prefix-123': true
    });

    expect(resultE).toEqual({
      'p-some-class-prefix-1': true,
      'p-some-class-prefix-2-xs': true,
      'p-some-class-prefix-3-s': true,
      'p-some-class-prefix-4-m': true,
      'p-some-class-prefix-5-l': true,
      'p-some-class-prefix-6-xl': true
    });
  });

  it('should create class by passing an "JSON5 string" prop', () => {
    const resultA = mapBreakpointPropToPrefixedClasses('some-class-prefix', `{base: 'some-string', xs: true, m: false, xl: 123}`, ['a', 'b']); // => JSON5
    const resultB = mapBreakpointPropToPrefixedClasses('some-class-prefix', '{"base": "some-string", "xs": true, "m": false, "xl": 123}', ['a', 'b']); // => JSON

    expect(resultA).toEqual({
      'p-some-class-prefix-some-string': true,
      'p-some-class-prefix-a-xs': true,
      'p-some-class-prefix-b-m': true,
      'p-some-class-prefix-123-xl': true
    });
    expect(resultB).toEqual(resultA);
  });
});
