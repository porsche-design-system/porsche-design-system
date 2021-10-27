import { getInputUnitPadding, UnitPositionType } from './text-field-wrapper-utils';
import { FormState } from '../../../types';

fdescribe('setInputUnitStyles()', () => {
  it.each<[UnitPositionType, FormState, string]>([
    ['prefix', 'none', '0.6875rem 0.6875rem 0.6875rem 3.75rem !important'],
    ['prefix', 'success', '0.625rem 0.625rem 0.625rem 3.75rem !important'],
    ['suffix', 'none', '0.6875rem 3.75rem 0.6875rem 0.6875rem !important'],
    ['suffix', 'success', '0.625rem 3.75rem 0.625rem 0.625rem !important'],
  ])('should for unitPosition: %s and state: %s return %s', (unitPosition, state, expected) => {
    expect(getInputUnitPadding(60, unitPosition, state)).toBe(expected);
  });
});
