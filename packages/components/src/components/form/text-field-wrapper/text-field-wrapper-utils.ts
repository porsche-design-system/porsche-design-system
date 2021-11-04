import { pxToRemWithUnit } from '../../../utils';
import { FormState } from '../../../types';

export const UNIT_POSITIONS = ['prefix', 'suffix'] as const;
export type TextFieldWrapperUnitPosition = typeof UNIT_POSITIONS[number];

export const getInputUnitPadding = (
  unitElementWidth: number,
  unitPosition: TextFieldWrapperUnitPosition,
  state: FormState
): string => {
  const padding = pxToRemWithUnit(state !== 'none' ? 10 : 11);
  return unitPosition === 'prefix'
    ? `${padding} ${padding} ${padding} ${pxToRemWithUnit(unitElementWidth)}`
    : `${padding} ${pxToRemWithUnit(unitElementWidth)} ${padding} ${padding}`;
};

export const setInputUnitStyles = (
  input: HTMLInputElement,
  unit: string,
  unitElementWidth: number,
  unitPosition: TextFieldWrapperUnitPosition,
  state: FormState
): void => {
  if (input.type === 'number' && unit) {
    input.style.setProperty('padding', getInputUnitPadding(unitElementWidth, unitPosition, state), 'important');
  }
};

export const throwIfUnitLengthExceeded = (unit: string): void => {
  if (unit.length > 5) {
    throw new RangeError(`Unit: ${unit} passed to 'PTextFieldWrapper' exceeds the maximum length of 5`);
  }
};
