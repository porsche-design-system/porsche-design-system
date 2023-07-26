import { INPUT_HEIGHT } from '../../styles/form-styles';
import { OPTION_HEIGHT } from '../../styles/select/option-styles';

export const SELECT_DROPDOWN_DIRECTIONS_INTERNAL = ['down', 'up'] as const;
export type SelectDropdownDirectionInternal = (typeof SELECT_DROPDOWN_DIRECTIONS_INTERNAL)[number];
export const SELECT_DROPDOWN_DIRECTIONS = [...SELECT_DROPDOWN_DIRECTIONS_INTERNAL, 'auto'] as const;
export type SelectDropdownDirection = (typeof SELECT_DROPDOWN_DIRECTIONS)[number];

const MAX_CHILDREN = 10;

export const determineDropdownDirection = (
  host: HTMLElement,
  visibleOptionLength: number
): SelectDropdownDirectionInternal => {
  const { top } = host.getBoundingClientRect();
  const listHeight = OPTION_HEIGHT * (visibleOptionLength > MAX_CHILDREN ? MAX_CHILDREN : visibleOptionLength) + 14; // 26 = 2 x 6px padding + 2px border
  const spaceBottom = window.innerHeight - top - INPUT_HEIGHT;
  return spaceBottom <= listHeight && top >= listHeight ? 'up' : 'down';
};
