import {
  getInputUnitPadding,
  setInputUnitStyles,
  throwIfUnitLengthExceeded,
  TextFieldWrapperUnitPosition,
} from './text-field-wrapper-utils';
import { FormState } from '../../../types';

describe('getInputUnitPadding()', () => {
  it.each<[TextFieldWrapperUnitPosition, FormState, string]>([
    ['prefix', 'none', '0.6875rem 0.6875rem 0.6875rem 3.75rem'],
    ['prefix', 'success', '0.625rem 0.625rem 0.625rem 3.75rem'],
    ['suffix', 'none', '0.6875rem 3.75rem 0.6875rem 0.6875rem'],
    ['suffix', 'success', '0.625rem 3.75rem 0.625rem 0.625rem'],
  ])('should for unitPosition: %s and state: %s return %s', (unitPosition, state, expected) => {
    expect(getInputUnitPadding(60, unitPosition, state)).toBe(expected);
  });
});

describe('setInputUnitStyles()', () => {
  it('should set inline style on input type number', async () => {
    const input = document.createElement('input');
    input.type = 'number';
    setInputUnitStyles(input, 'km/h', 60, 'prefix', 'none');

    expect(input.style.cssText).toBe('padding: 0.6875rem 0.6875rem 0.6875rem 3.75rem !important;');
  });
});

describe('throwIfUnitLengthExceeded()', () => {
  it('should throw error if unit length > 5', () => {
    expect(() => throwIfUnitLengthExceeded('123456')).toThrow();
  });
});
