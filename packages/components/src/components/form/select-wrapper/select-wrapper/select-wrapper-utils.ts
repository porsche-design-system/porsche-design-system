import { isTouchDevice } from '../../../../utils';

export const DROPDOWN_DIRECTIONS_INTERNAL = ['down', 'up'] as const;
export type DropdownDirectionInternal = typeof DROPDOWN_DIRECTIONS_INTERNAL[number];
export const DROPDOWN_DIRECTIONS = [...DROPDOWN_DIRECTIONS_INTERNAL, 'auto'] as const;
export type DropdownDirection = typeof DROPDOWN_DIRECTIONS[number];

export const isCustomDropdown = (filter: boolean, native: boolean): boolean => {
  if (filter) {
    return true;
  } else if (native) {
    return false;
  } else {
    return !isTouchDevice();
  }
};
