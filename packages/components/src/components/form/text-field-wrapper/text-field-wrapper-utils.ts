import { pxToRemWithUnit } from '../../../utils';
import { FormState } from '../../../types';

export const UNIT_POSITIONS = ['prefix', 'suffix'] as const;
export type UnitPositionType = typeof UNIT_POSITIONS[number];

export const getInputUnitPadding = (
  unitElementWidth: number,
  unitPosition: UnitPositionType,
  state: FormState
): string => {
  const padding = state !== 'none' ? 10 : 11;

  return unitPosition === 'prefix'
    ? `${pxToRemWithUnit(padding)} ${pxToRemWithUnit(padding)} ${pxToRemWithUnit(padding)} ${pxToRemWithUnit(
        unitElementWidth
      )}`
    : `${pxToRemWithUnit(padding)} ${pxToRemWithUnit(unitElementWidth)} ${pxToRemWithUnit(padding)} ${pxToRemWithUnit(
        padding
      )}`;
};

export const setInputUnitStyles = (
  unit: string,
  input: HTMLInputElement,
  unitElementWidth: number,
  unitPosition: UnitPositionType,
  state: FormState
): void => {
  if (!unit || input.type !== 'number') {
    input.style.cssText = '';
  } else if (unit && input.type === 'number') {
    input.style.setProperty('padding', getInputUnitPadding(unitElementWidth, unitPosition, state), 'important');
  }
};

export const throwIfUnitLengthExceeded = (unit: string): void => {
  if (unit.length > 5) {
    throw new Error(`Unit: ${unit} passed to 'PTextFieldWrapper' exceeds the maximum length of 5`);
  }
};
