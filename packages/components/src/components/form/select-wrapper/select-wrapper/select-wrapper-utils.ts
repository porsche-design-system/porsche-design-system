import { isTouchDevice } from '../../../../utils';

export type DropdownDirectionInternal = 'down' | 'up';
export type DropdownDirection = DropdownDirectionInternal | 'auto';

export const isCustomDropdown = (filter: boolean, native: boolean): boolean => {
  if (filter) {
    return true;
  } else if (native) {
    return false;
  } else {
    return !isTouchDevice();
  }
};
