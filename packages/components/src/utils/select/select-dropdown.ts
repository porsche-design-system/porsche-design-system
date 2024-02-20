import { OPTION_HEIGHT } from '../../styles/option-styles';

export const SELECT_DROPDOWN_DIRECTIONS_INTERNAL = ['down', 'up'] as const;
export type SelectDropdownDirectionInternal = (typeof SELECT_DROPDOWN_DIRECTIONS_INTERNAL)[number];
export const SELECT_DROPDOWN_DIRECTIONS = [...SELECT_DROPDOWN_DIRECTIONS_INTERNAL, 'auto'] as const;
export type SelectComponentsDropdownDirection = (typeof SELECT_DROPDOWN_DIRECTIONS)[number];

const MAX_CHILDREN = 9;
const INPUT_HEIGHT = 54;

export const determineDropdownDirection = (
  host: HTMLElement,
  visibleOptionLength: number
): SelectDropdownDirectionInternal => {
  const { top } = host.getBoundingClientRect();
  const listHeight = OPTION_HEIGHT * (visibleOptionLength > MAX_CHILDREN ? MAX_CHILDREN : visibleOptionLength) + 64; // 64 = 2 x 6px padding + 2px border + 50px combobox height
  const spaceBottom = window.innerHeight - top - INPUT_HEIGHT;
  return spaceBottom <= listHeight && top >= listHeight ? 'up' : 'down';
};
