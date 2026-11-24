import { describe, expect, it } from 'vitest';
import { serializeSsrProps } from '../../../src/serializeSsrProps';

describe('serializeSsrProps()', () => {
  it('should return undefined when every prop is undefined or its default', () => {
    expect(
      serializeSsrProps({ variant: 'primary', compact: false, name: undefined }, { variant: 'primary', compact: false })
    ).toBe(undefined);
  });

  it('should serialize props that differ from their default', () => {
    expect(
      serializeSsrProps(
        { variant: 'secondary', compact: false, name: 'some-name' },
        { variant: 'primary', compact: false }
      )
    ).toBe('{"variant":"secondary","name":"some-name"}');
  });

  it('should keep the types of booleans, numbers, null, objects and arrays', () => {
    const props: Record<string, unknown> = {
      disabled: true,
      maxLength: 10,
      value: null,
      hideLabel: { base: true, s: false },
      aria: { 'aria-label': 'Some label' },
      options: ['a', 'b'],
    };

    expect(JSON.parse(serializeSsrProps(props, { disabled: false, hideLabel: false }) as string)).toEqual(props);
  });

  it('should serialize object props even when they deep-equal their default', () => {
    expect(serializeSsrProps({ hideLabel: { base: false } }, { hideLabel: { base: false } })).toBe(
      '{"hideLabel":{"base":false}}'
    );
  });

  it('should leave out functions', () => {
    expect(serializeSsrProps({ variant: 'secondary', callback: () => {} }, {})).toBe('{"variant":"secondary"}');
  });

  it('should return undefined instead of throwing when the props cannot be serialized', () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;

    expect(serializeSsrProps({ variant: 'secondary', aria: circular }, {})).toBe(undefined);
    expect(serializeSsrProps({ value: BigInt(1) }, {})).toBe(undefined);
  });
});
