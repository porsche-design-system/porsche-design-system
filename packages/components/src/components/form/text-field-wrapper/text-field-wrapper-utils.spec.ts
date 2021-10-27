import { getInputUnitPadding, setInputUnitStyles, UnitPositionType } from './text-field-wrapper-utils';
import { FormState } from '../../../types';

describe('getInputUnitPadding()', () => {
  it.each<[UnitPositionType, FormState, string]>([
    ['prefix', 'none', '0.6875rem 0.6875rem 0.6875rem 3.75rem'],
    ['prefix', 'success', '0.625rem 0.625rem 0.625rem 3.75rem'],
    ['suffix', 'none', '0.6875rem 3.75rem 0.6875rem 0.6875rem'],
    ['suffix', 'success', '0.625rem 3.75rem 0.625rem 0.625rem'],
  ])('should for unitPosition: %s and state: %s return %s', (unitPosition, state, expected) => {
    expect(getInputUnitPadding(60, unitPosition, state)).toBe(expected);
  });
});

describe('setInputUnitStyles()', () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    input = document.createElement('input');
    input.type = 'number';
  });

  it('should set inline style on input type number', async () => {
    setInputUnitStyles('km/h', input, 60, 'prefix', 'none');

    expect(input.style.padding).toBe('0.6875rem 0.6875rem 0.6875rem 3.75rem');
  });

  it('should remove inline style on input when no unit is passed', async () => {
    setInputUnitStyles('km/h', input, 60, 'prefix', 'none');

    expect(input.style.padding).toBe('0.6875rem 0.6875rem 0.6875rem 3.75rem');

    setInputUnitStyles('', input, 60, 'prefix', 'none');

    expect(input.style.padding).toBe('');
  });

  it('should remove inline style on input when input type is changed', async () => {
    setInputUnitStyles('km/h', input, 60, 'prefix', 'none');

    expect(input.style.padding).toBe('0.6875rem 0.6875rem 0.6875rem 3.75rem');

    input.type = 'text';

    setInputUnitStyles('km/h', input, 60, 'prefix', 'none');

    expect(input.style.padding).toBe('');
  });
});
