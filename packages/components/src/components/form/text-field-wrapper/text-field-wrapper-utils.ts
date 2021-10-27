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
      )} !important`
    : `${pxToRemWithUnit(padding)} ${pxToRemWithUnit(unitElementWidth)} ${pxToRemWithUnit(padding)} ${pxToRemWithUnit(
        padding
      )} !important`;
};
